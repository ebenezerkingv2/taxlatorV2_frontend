// ====================================
// src/pages/taxPages/Freelancer.tsx
// ====================================
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import TaxOptionsButton from "../../components/ui/buttons/TaxOptionsButton";
import CalculateTaxButton from "../../components/ui/buttons/CalculateTaxButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import { parseNumber } from "../../utils/numberInput";
import TaxFrame from "../../components/dashboard/dashComponents/frames/TaxFrame";
import { calculateFreelancerApi } from "../../api/tax.api";
import { AnimatedFormCollapse } from "../../components/ui/animations/AnimatedCollapse";
import ResultCard from "../../components/ui/displayApiResult/ResultCard";
import ResultRow from "../../components/ui/displayApiResult/ResultRow";
import GuestCTA from "../../components/ui/displayApiResult/GuestCTA";
import { useUser } from "../../context/useUser";
import { useQueryClient } from "@tanstack/react-query";
// ==================================== SHARED IMPORT

import type { TaxResult } from "../../api/types/tax.types";

// ==================================== FUNCTION

export default function Freelancer() {
	// ================= STATE
	const [income, setIncome] = useState("");
	const [pension, setPensionContribution] = useState("");
	const [includeExpenses, setIncludeExpenses] = useState(false);
	const [totalBusinessExpenses, setTotalBusinessExpenses] = useState("");

	// ================= STATE
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TaxResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const location = useLocation();
	const { user } = useUser();
	const isAuthenticated = Boolean(user?.id);

	// ================= DERIVED NUMBERS
	const incomeNum = useMemo(() => parseNumber(income), [income]);
	const pensionNum = useMemo(() => parseNumber(pension), [pension]);
	const expensesNum = useMemo(
		() => parseNumber(totalBusinessExpenses),
		[totalBusinessExpenses],
	);
	// ================= CLEAR INPUT FIELDS AFTER CALCULATION
	const clearInputs = () => {
		setIncome("");
		setPensionContribution("");
		setTotalBusinessExpenses("");
		setIncludeExpenses(false);
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
				totalBusinessExpenses: includeExpenses ? expensesNum : undefined,
				pensionContribution: pensionNum || undefined,
			};

			const result = await calculateFreelancerApi(payload);

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
			{/* ================================== HEADER*/}
			<div className="text-[1.2rem] md:text-[1.5rem] flex justify-center py-1">
				<TaxOptionsButton className="px-[2rem] py-[0.5rem]">
					Tax Options
				</TaxOptionsButton>
			</div>

			{/* ================================== MAIN GRID */}
			<div className="grid lg:grid-cols-2 gap-6">
				{/* ================================== LEFT (FORM*/}
				<div className="relative rounded-2xl p-6 bg-gradient-to-b from-black via-[#000aff] to-black">
					<div className="flex flex-col items-center text-[#01bdfc] mb-8">
						<h2 className="text-xl font-bold">FREELANCER</h2>
						<p className="text-xs text-[#dbcfff]/90">Self-employed tax</p>
					</div>

					<div className="space-y-3">
						<CurrencyInput
							id="income"
							label="Gross Annual Income"
							value={income}
							onChange={setIncome}
						/>

						<CurrencyInput
							id="pension"
							label="Pension Contribution"
							value={pension}
							onChange={setPensionContribution}
						/>

						{/* ================================== TOGGLE */}
						<div className="text-[#dbcfff]/90">
							<div className="flex justify-between items-center bg-black p-4 rounded-lg">
								<span className="text-sm">Include Business Expenses</span>

								<input
									type="checkbox"
									className="text-base appearance-none w-7 h-5 border border-[#01bdfc]/50 rounded-full checked:bg-[#f4ab17] cursor-pointer"
									checked={includeExpenses}
									onChange={(e) => setIncludeExpenses(e.target.checked)}
								/>
							</div>

							<AnimatedFormCollapse show={includeExpenses}>
								<CurrencyInput
									id="expenses"
									label="Total Business Expenses"
									value={totalBusinessExpenses}
									onChange={setTotalBusinessExpenses}
								/>
							</AnimatedFormCollapse>
						</div>

						{/* ================================== BUTTON*/}
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
								label="Gross Annual Income"
								shortLabel="GAI"
								value={result.grossAnnualIncome}
							/>
							<ResultRow
								label="Taxable Income"
								shortLabel="Taxable Inc"
								value={result.taxableIncome}
							/>

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							<ResultRow
								label="Annual Tax"
								shortLabel="Ann Tax"
								value={result.totalAnnualTax}
							/>
							<ResultRow
								label="Monthly Tax"
								shortLabel="Mon Tax"
								value={result.monthlyTax}
							/>

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							<ResultRow
								label="Net Annual Income"
								shortLabel="NAI"
								value={result.netAnnualIncome}
							/>
							<ResultRow
								label="Net Monthly Income"
								shortLabel="NMI"
								value={result.netMonthlyIncome}
							/>

							{/* ============== */}
							<hr className="border-[#01bdfc]" />

							{result.deductions && (
								<>
									<div className="space-y-2">
										<p className="text-[#f4ab17]/90 text-sm font-semibold">
											Deductions
										</p>

										<ResultRow
											label="Pension Contribution"
											shortLabel="Pension Cont"
											value={result.deductions.pensionContribution}
										/>
										<ResultRow
											label="Business Expenses"
											shortLabel="Business Exp"
											value={result.deductions.totalBusinessExpenses}
										/>
									</div>
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
											className="flex justify-between text-xs text-[#dbcfff]"
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
