// ====================================
// src/pages/taxPages/VAT.tsx
// ====================================
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import TaxOptionsButton from "../../components/ui/buttons/TaxOptionsButton";
import CalculateTaxButton from "../../components/ui/buttons/CalculateTaxButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import { parseNumber } from "../../utils/numberInput";
import TaxFrame from "../../components/ui/frames/TaxFrame";
import { calculateVatApi } from "../../api/tax.api";
import ResultCard from "../../components/ui/displayApiResult/ResultCard";
import ResultRow from "../../components/ui/displayApiResult/ResultRow";
import GuestCTA from "../../components/ui/displayApiResult/GuestCTA";
import { useUser } from "../../context/useUser";
import { useQueryClient } from "@tanstack/react-query";

// ==================================== SHARED IMPORT
import type {
	CalculationType,
	TransactionType,
	TaxResult,
} from "../../api/types/tax.types";

// ==================================== FUNCTION
export default function VAT() {
	// ================= STATE
	const [amount, setAmount] = useState("");
	const [calculationType, setCalculationType] =
		useState<CalculationType>("ADD");
	const [transactionType, setTransactionType] =
		useState<TransactionType>("DOMESTIC");

	// ================= STATE
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TaxResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const location = useLocation();
	const { user } = useUser();
	const isAuthenticated = Boolean(user?.id);

	// ================= DERIVED NUMBERS
	const amountNum = useMemo(() => parseNumber(amount), [amount]);

	// ================= CLEAR INPUT FIELDS AFTER CALCULATION
	const clearInputs = () => {
		setAmount("");
	};

	// ================= VALIDATION
	const isValid = amountNum > 0;

	// ================= DASHBOARD ROUTE
	const isDashboardTaxRoute = location.pathname.startsWith("/dashboard/tax/");

	// ================= QUERY CLIENT
	const queryClient = useQueryClient();

	// ================= HANDLER (BACKEND CONNECTED)
	const handleCalculate = async () => {
		try {
			setLoading(true);
			setError(null);

			const payload = {
				transactionAmount: amountNum,
				calculationType,
				transactionType,
			};

			// ================= SAVED USER
			const result = await calculateVatApi(payload);

			setResult(result);

			// ================= AUTO REFRESH HISTORY (REACT QUERY WAY)
			if (isAuthenticated) {
				queryClient.invalidateQueries({ queryKey: ["history"] });
			}

			setTimeout(() => {
				clearInputs();
			}, 200);
		} catch (err) {
			console.error(err);
			setError("Failed to calculate tax");
		} finally {
			setLoading(false);
		}
	};

	const TRANSACTION_TYPES: {
		label: string;
		value: TransactionType;
	}[] = [
		{ label: "Domestic", value: "DOMESTIC" },
		{ label: "Digital", value: "DIGITAL" },
		{ label: "Export", value: "EXPORT" },
		{ label: "Exempt", value: "EXEMPT" },
	];

	return (
		<TaxFrame>
			{/* ================= HEADER ================= */}
			<div className="text-[1.2rem] md:text-[1.5rem] flex justify-center py-1">
				<TaxOptionsButton className="px-[2rem] py-[0.3rem]">
					Tax Options
				</TaxOptionsButton>
			</div>

			{/* ================= MAIN GRID ================= */}
			<div className="grid lg:grid-cols-2 gap-6">
				{/* ================= LEFT ================= */}
				<div className="relative rounded-2xl p-6 bg-gradient-to-b from-black via-[#000aff] to-black">
					<div className="flex flex-col items-center text-[#01bdfc] mb-6">
						<h2 className="text-xl font-semibold">VAT</h2>
						<p className="text-xs text-[#dbcfff]/90">Value Added Tax</p>
					</div>

					<div className="space-y-4">
						<CurrencyInput
							id="amount"
							label="Transaction Amount"
							value={amount}
							onChange={setAmount}
						/>

						{/* ================= ADD / REMOVE ================= */}
						<div className="grid grid-cols-2 gap-3">
							<button
								onClick={() => setCalculationType("ADD")}
								className={`rounded-lg py-2 text-sm font-semibold cursor-pointer transition-colors duration-300  ${
									calculationType === "ADD"
										? "border border-[#f4ab17] text-[#f4ab17]"
										: "bg-black text-[#01bdfc] border border-[#01bdfc]/50"
								}`}
							>
								+ Add VAT
							</button>

							<button
								onClick={() => setCalculationType("REMOVE")}
								className={`rounded-lg py-2 text-sm font-semibold cursor-pointer transition-colors duration-300  ${
									calculationType === "REMOVE"
										? "border border-[#f4ab17] text-[#f4ab17]"
										: "bg-black text-[#01bdfc] border border-[#01bdfc]/50"
								}`}
							>
								- Remove VAT
							</button>
						</div>

						{/* ================= TRANSACTION TYPE ================= */}
						<div className="space-y-3">
							{TRANSACTION_TYPES.map((item) => (
								<button
									key={item.value}
									onClick={() => setTransactionType(item.value)}
									className={`w-full flex justify-between items-center px-3 py-3 rounded-lg text-sm cursor-pointer transition-all duration-300 ${
										transactionType === item.value
											? "border border-[#f4ab17] text-[#f4ab17]"
											: "bg-black border border-[#01bdfc]/20 text-[#dbcfff]/80"
									}`}
								>
									<span>{item.label}</span>
									<span className="transition-colors duration-300 ease-in-out">
										{transactionType === item.value ? "✔" : ""}
									</span>
								</button>
							))}
						</div>

						{/* ================= BUTTON ================= */}
						<CalculateTaxButton
							onClick={handleCalculate}
							enabled={isValid}
							loading={loading}
						/>

						{error && (
							<p className="text-red-500 text-xs mt-2 text-center">{error}</p>
						)}
					</div>
				</div>
				{/* ===============================================================*/}
				{/* ===============================================================*/}
				{/* ================= RIGHT ================= */}
				<ResultCard result={result}>
					{result && (
						<>
							<ResultRow
								label="Transaction Amount"
								value={result.grossAnnualIncome}
							/>
							<ResultRow label="Taxable Amount" value={result.taxableIncome} />

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							<ResultRow label="VAT Amount" value={result.totalAnnualTax} />
							<ResultRow label="Monthly VAT" value={result.monthlyTax} />

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							<ResultRow
								label="Net Amount (Annual)"
								value={result.netAnnualIncome}
							/>
							<ResultRow
								label="Net Amount (Monthly)"
								value={result.netMonthlyIncome}
							/>

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							{result.meta?.taxType === "VAT" && (
								<>
									<ResultRow
										label="Calculation Type"
										value={result.meta.calculationType}
									/>

									<ResultRow
										label="Transaction Type"
										value={result.meta.transactionType}
									/>
								</>
							)}

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							{result.taxBreakdown?.length > 0 && (
								<div className="space-y-2">
									<p className="text-[#f4ab17]/90 text-sm font-semibold">
										Tax Breakdown
									</p>

									{result.taxBreakdown.map((item, index) => (
										<div
											key={index}
											className="flex justify-between text-xs text-[#dbcfff]/90"
										>
											<span>{item.label}</span>
											<span>₦{item.tax.toLocaleString()}</span>
										</div>
									))}
								</div>
							)}
						</>
					)}
					{result && !isDashboardTaxRoute && <GuestCTA />}
				</ResultCard>
			</div>
		</TaxFrame>
	);
}
