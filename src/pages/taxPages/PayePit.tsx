// ====================================
// src/pages/taxPages/PayePit.tsx
// ==================================== PAYE / PIT TAX CALCULATION/RESULT LAYOUT
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import TaxOptionsButton from "../../components/ui/buttons/TaxOptionsButton";
import CalculateTaxButton from "../../components/ui/buttons/CalculateTaxButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import { parseNumber } from "../../utils/numberInput";
import TaxFrame from "../../components/ui/frames/TaxFrame";
import { calculatePayeApi } from "../../api/tax.api";
import { AnimatedToggleRow } from "../../components/ui/animations/AnimatedToggleRow";
import ResultCard from "../../components/ui/displayApiResult/ResultCard";
import ResultRow from "../../components/ui/displayApiResult/ResultRow";
import GuestCTA from "../../components/ui/displayApiResult/GuestCTA";
import { useUser } from "../../context/useUser";
import { useQueryClient } from "@tanstack/react-query";

// ==================================== SHARED IMPORT
import type { TaxResult } from "../../api/types/tax.types";

// ==================================== FUNCTION
export default function PayePit() {
	// ================= STATE
	const [income, setIncome] = useState("");
	const [other, setOther] = useState("");
	const [nhis, setNhis] = useState(false);
	const [nhf, setNhf] = useState(false);

	// ================= STATE
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TaxResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const location = useLocation();
	const { user } = useUser();
	const isAuthenticated = Boolean(user?.id);

	// ================= DERIVED NUMBERS
	const incomeNum = useMemo(() => parseNumber(income), [income]);
	const otherNum = useMemo(() => parseNumber(other), [other]);

	// ================= CLEAR INPUT FIELDS AFTER CALCULATION
	const clearInputs = () => {
		setIncome("");
		setOther("");
	};

	// ================= VALIDATION
	const isValid = incomeNum > 0;

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
				grossAnnualIncome: incomeNum,
				otherDeductions: otherNum || undefined,
				nationalHealthInsuranceScheme: nhis,
				nationalHousingFund: nhf,
			};

			// ================= SAVED USER
			const result = await calculatePayeApi(payload);

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

	return (
		<TaxFrame>
			{/* ================= HEADER TAX OPTIONS BUTTON ================= */}
			<div className="text-[1.2rem] md:text-[1.5rem] flex justify-center py-1">
				<TaxOptionsButton className="px-[2rem] py-[0.3rem]">
					Tax Options
				</TaxOptionsButton>
			</div>

			{/* ================= MAIN GRID ================= */}
			<div className="grid lg:grid-cols-2 gap-6">
				{/* ================= LEFT (TAX CALCULATOR FORM) ======================= */}
				<div className="relative rounded-2xl p-6 bg-gradient-to-b from-black via-[#000aff] to-black">
					{/* ================= HEADER  */}
					<div className="flex flex-col items-center text-[#01bdfc] mb-6">
						<h2 className="text-xl font-semibold">PAYE / PIT</h2>
						<p className="text-xs text-[#dbcfff]/90">Personal Income Tax</p>
					</div>

					{/* ================= FORM  */}
					<div className="space-y-2">
						<CurrencyInput
							id="income"
							label="Gross Annual Income"
							value={income}
							onChange={setIncome}
						/>

						<CurrencyInput
							id="other"
							label="Other Deductions"
							value={other}
							onChange={setOther}
						/>

						{/* ================= TOGGLES ================= */}
						<AnimatedToggleRow show={true}>
							<div className="space-y-3 text-[#dbcfff]/90">
								<div className="flex justify-between items-center bg-black p-3 rounded-lg">
									<span className="lg:hidden text-sm">NHIS (5%)</span>
									<span className="hidden lg:block text-sm">
										Include National Housing Fund (5%)
									</span>

									<input
										type="checkbox"
										className="appearance-none w-4 h-4 border border-[#01bdfc]/50 rounded-full checked:bg-[#f4ab17] cursor-pointer"
										checked={nhis}
										onChange={(e) => setNhis(e.target.checked)}
									/>
								</div>

								<div className="flex justify-between items-center bg-black p-3 rounded-lg">
									<span className="lg:hidden text-sm">NHF (2.5%)</span>
									<span className="hidden lg:block text-sm">
										Include National Health Insurance Scheme (2.5%)
									</span>

									<input
										type="checkbox"
										className="appearance-none w-4 h-4 border border-[#01bdfc]/50 rounded-full checked:bg-[#f4ab17] cursor-pointer"
										checked={nhf}
										onChange={(e) => setNhf(e.target.checked)}
									/>
								</div>
							</div>
						</AnimatedToggleRow>

						{/* ================= CALCULATE BUTTON ================= */}
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
				{/* ================================== RIGHT (RESULT) */}
				<ResultCard result={result}>
					{result && (
						<>
							<ResultRow
								label="Gross Income"
								value={result.grossAnnualIncome}
							/>
							<ResultRow label="Taxable Income" value={result.taxableIncome} />

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							<ResultRow label="Annual Tax" value={result.totalAnnualTax} />
							<ResultRow label="Monthly Tax" value={result.monthlyTax} />

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							<ResultRow
								label="Net Annual Income"
								value={result.netAnnualIncome}
							/>
							<ResultRow
								label="Net Monthly Income"
								value={result.netMonthlyIncome}
							/>

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							{result.deductions && (
								<div className="space-y-2">
									<p className="text-[#f4ab17]/90 text-sm font-semibold">
										Deductions
									</p>

									<ResultRow
										label="National Health Insurance Scheme"
										value={result.deductions.nhis}
									/>

									<ResultRow
										label="National Housing Fund"
										value={result.deductions.nhf}
									/>

									<ResultRow
										label="Government Relief Allowance"
										value={result.deductions.cra}
									/>

									<ResultRow
										label="Pension Contribution"
										value={result.deductions.pension}
									/>

									<ResultRow
										label="Other Deductions"
										value={result.deductions.otherDeductions}
									/>
								</div>
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
