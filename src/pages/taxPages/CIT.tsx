// ====================================
// src/pages/taxPages/CIT.tsx
// ====================================
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import TaxOptionsButton from "../../components/ui/buttons/TaxOptionsButton";
import CalculateTaxButton from "../../components/ui/buttons/CalculateTaxButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import { parseNumber } from "../../utils/numberInput";
import CompanySizeSelect from "../../components/ui/buttons/CompanySizeSelectButton";
import TaxFrame from "../../components/ui/frames/TaxFrame";
import { calculateCitApi } from "../../api/tax.api";
import ResultCard from "../../components/ui/displayApiResult/ResultCard";
import ResultRow from "../../components/ui/displayApiResult/ResultRow";
import GuestCTA from "../../components/ui/displayApiResult/GuestCTA";
import { useUser } from "../../context/useUser";
import { useQueryClient } from "@tanstack/react-query";

// =============================== TYPES
import type { TaxResult, CitMeta } from "../../api/types/tax.types";

export default function CIT() {
	const [annualTurnover, setAnnualTurnover] = useState("");
	const [fixedAssets, setFixedAssets] = useState("");
	const [taxableProfit, setTaxableProfit] = useState("");
	const [companySize, setCompanySize] = useState<
		"" | "SMALL" | "OTHER" | "MULTINATIONAL"
	>("");
	const [accountingProfit, setAccountingProfit] = useState("");

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TaxResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	const location = useLocation();
	const { user } = useUser();
	const isAuthenticated = Boolean(user?.id);

	const queryClient = useQueryClient();

	// ================= DERIVED
	const annualTurnoverNum = useMemo(
		() => parseNumber(annualTurnover),
		[annualTurnover],
	);

	const fixedAssetsNum = useMemo(() => parseNumber(fixedAssets), [fixedAssets]);

	const taxableProfitNum = useMemo(
		() => parseNumber(taxableProfit),
		[taxableProfit],
	);

	const accountingProfitNumber = useMemo(
		() => parseNumber(accountingProfit),
		[accountingProfit],
	);

	const isValid = annualTurnoverNum > 0;

	const citMeta = result?.meta as CitMeta | undefined;

	const isDashboardTaxRoute = location.pathname.startsWith("/dashboard/tax/");

	const clearInputs = () => {
		setAnnualTurnover("");
		setFixedAssets("");
		setTaxableProfit("");
		setAccountingProfit("");
	};

	const handleCalculate = async () => {
		try {
			if (!companySize || annualTurnoverNum <= 0) return;

			setLoading(true);
			setError(null);

			const payload = {
				annualTurnover: annualTurnoverNum,
				taxableProfit: taxableProfitNum,
				fixedAssets: fixedAssetsNum || undefined,
				isMultinational: companySize === "MULTINATIONAL",
				accountingProfit:
					companySize === "MULTINATIONAL" ? accountingProfitNumber : undefined,
			};

			const result = await calculateCitApi(payload);
			setResult(result);

			if (isAuthenticated) {
				queryClient.invalidateQueries({ queryKey: ["history"] });
			}

			setTimeout(clearInputs, 200);
		} catch (err) {
			console.error(err);
			setError("Failed to calculate tax");
		} finally {
			setLoading(false);
		}
	};

	return (
		<TaxFrame>
			<div className="text-[1.2rem] md:text-[1.5rem] flex justify-center py-1">
				<TaxOptionsButton className="px-[2rem] py-[0.5rem]">
					Tax Options
				</TaxOptionsButton>
			</div>

			<div className="grid lg:grid-cols-2 gap-6">
				{/* LEFT */}
				<div className="relative rounded-2xl p-6 bg-gradient-to-b from-black via-[#000aff] to-black">
					<div className="flex flex-col items-center text-[#01bdfc] mb-8">
						<h2 className="text-xl font-semibold">Company Income Tax</h2>
						<p className="text-xs text-[#dbcfff]/90">Corporate tax</p>
					</div>

					<div className="space-y-3">
						<CurrencyInput
							id="turnover"
							label="Annual Turnover"
							value={annualTurnover}
							onChange={setAnnualTurnover}
						/>

						<CurrencyInput
							id="assets"
							label="Fixed Assets"
							value={fixedAssets}
							onChange={setFixedAssets}
						/>

						<CurrencyInput
							id="profit"
							label="Taxable Profit"
							value={taxableProfit}
							onChange={setTaxableProfit}
						/>

						<CompanySizeSelect value={companySize} onChange={setCompanySize} />

						{companySize === "MULTINATIONAL" && (
							<CurrencyInput
								id="accounting-profit"
								label="Accounting Profit"
								value={accountingProfit}
								onChange={setAccountingProfit}
							/>
						)}

						<CalculateTaxButton
							onClick={handleCalculate}
							enabled={isValid}
							loading={loading}
						/>

						{error && (
							<p className="text-red-500 text-xs text-center">{error}</p>
						)}
					</div>
				</div>

				{/* RIGHT */}
				<ResultCard result={result}>
					{result && (
						<>
							<ResultRow
								label="Annual Turnover"
								value={result.grossAnnualIncome}
							/>
							<ResultRow label="Taxable Profit" value={result.taxableIncome} />

							<hr className="border-[#01bdfc]" />

							<ResultRow label="Annual Tax" value={result.totalAnnualTax} />
							<ResultRow label="Monthly Tax" value={result.monthlyTax} />

							<hr className="border-[#01bdfc]" />

							<ResultRow
								label="Profit After Tax (Annual)"
								value={result.netAnnualIncome}
							/>
							<ResultRow
								label="Profit After Tax (Monthly)"
								value={result.netMonthlyIncome}
							/>

							{citMeta && (
								<>
									<hr className="border-[#01bdfc]" />

									<ResultRow label="Company Size" value={citMeta.companySize} />
									<ResultRow label="Applied Rate" value={citMeta.appliedRate} />
								</>
							)}

							{result.taxBreakdown?.length > 0 && (
								<>
									<hr className="border-[#01bdfc]" />

									<div className="space-y-2">
										{result.taxBreakdown.map((item, i) => (
											<div
												key={i}
												className="flex justify-between text-xs text-[#dbcfff]/90"
											>
												<span>{item.label}</span>
												<span>₦{item.tax.toLocaleString()}</span>
											</div>
										))}
									</div>
								</>
							)}
						</>
					)}

					{result && !isDashboardTaxRoute && <GuestCTA />}
				</ResultCard>
			</div>
		</TaxFrame>
	);
}
