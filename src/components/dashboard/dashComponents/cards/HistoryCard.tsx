// =====================================
// src/components/dashboard/dashComponents/cards/HistoryCard.tsx
// ===================================== HISTORY CARD COMPONENT
import CardFrame from "../../../ui/frames/CardFrame";
import DashboradCardFrame from "../frames/DashboardCardFrame";
import { AnimatedCollapse } from "../../../ui/animations/AnimatedCollapse";

import { formatDate } from "../../dashUtils/dateFormatter";
import TaxBadge from "../TaxBadge";

import type { TaxType } from "@taxlator/shared";
import type { TaxHistoryItem } from "../../dashApi/historyApi";

// =====================================
type HistoryCardProps = {
	item: TaxHistoryItem;
	isExpanded: boolean;
	onToggle: () => void;
};

// =====================================
export default function HistoryCard({
	item,
	isExpanded,
	onToggle,
}: HistoryCardProps) {
	const r = item.outputSnapshot;

	return (
		<DashboradCardFrame>
			<CardFrame
				onClick={onToggle}
				className="p-4 cursor-pointer hover:scale-[1.01] transition duration-300"
			>
				{/* ================= HEADER ================= */}
				<div className="flex justify-between items-start">
					{/* ================= LEFT ================= */}
					<div className="flex flex-col gap-2 text-left font-bold">
						<h2 className="text-[#f4ab17]">{item.taxType} Calculation</h2>

						<p className="text-[#dbcfff] text-sm">
							{formatDate(item.createdAt)}
						</p>

						<p className="text-[#dbcfff]/90 text-sm flex items-center gap-2">
							Type:
							<TaxBadge type={item.taxType as TaxType} className="ml-2" />
						</p>
					</div>

					{/* ================= RIGHT ================= */}
					<div className="flex flex-col gap-2 text-sm text-right font-bold">
						<p>
							Income:
							<span className="text-[#01bdfc] ml-2">
								₦{r.grossAnnualIncome.toLocaleString()}
							</span>
						</p>

						<p>
							Tax:
							<span className="text-red-400 ml-2">
								₦{r.totalAnnualTax.toLocaleString()}
							</span>
						</p>

						<p>
							Net:
							<span className="text-green-400 ml-2">
								₦{r.netAnnualIncome.toLocaleString()}
							</span>
						</p>
					</div>
				</div>

				{/* ================= EXPANDED RESULT ================= */}
				<AnimatedCollapse show={isExpanded} duration={0.35} className="mt-4">
					<div className="pt-4 border-t border-[#01bdfc]/30 space-y-3 text-sm text-[#dbcfff]/90">
						{/* ================= RESULT */}
						<div className="space-y-2">
							<div className="flex justify-between">
								<span>Gross Income</span>

								<span className="text-[#01bdfc]">
									₦{r.grossAnnualIncome.toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between">
								<span>Taxable Income</span>

								<span className="text-[#01bdfc]">
									₦{r.taxableIncome?.toLocaleString?.() ?? "—"}
								</span>
							</div>
						</div>

						<hr className="border-[#01bdfc]/30" />

						{/* ================= TAX SUMMARY */}
						<div className="space-y-2">
							<div className="flex justify-between">
								<span>Annual Tax</span>

								<span className="text-red-400">
									₦{r.totalAnnualTax.toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between">
								<span>Monthly Tax</span>

								<span className="text-red-400">
									₦{r.monthlyTax?.toLocaleString?.() ?? "—"}
								</span>
							</div>
						</div>

						<hr className="border-[#01bdfc]/30" />

						{/* ================= NET INCOME */}
						<div className="space-y-2">
							<div className="flex justify-between">
								<span>Net Annual</span>

								<span className="text-green-400">
									₦{r.netAnnualIncome.toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between">
								<span>Net Monthly</span>

								<span className="text-green-400">
									₦{r.netMonthlyIncome?.toLocaleString?.() ?? "—"}
								</span>
							</div>
						</div>

						{/* ================= DEDUCTIONS */}
						{r.deductions && (
							<>
								<hr className="border-[#01bdfc]/30" />

								<div className="space-y-2">
									<p className="text-[#f4ab17] font-semibold">Deductions</p>

									<div className="flex justify-between">
										<span>NHIS</span>

										<span>₦{r.deductions.nhis?.toLocaleString?.() ?? 0}</span>
									</div>

									<div className="flex justify-between">
										<span>NHF</span>

										<span>₦{r.deductions.nhf?.toLocaleString?.() ?? 0}</span>
									</div>

									<div className="flex justify-between">
										<span>Pension</span>

										<span>
											₦{r.deductions.pension?.toLocaleString?.() ?? 0}
										</span>
									</div>

									<div className="flex justify-between">
										<span>Other</span>

										<span>
											₦{r.deductions.otherDeductions?.toLocaleString?.() ?? 0}
										</span>
									</div>
								</div>
							</>
						)}

						{/* ================= TAX BREAKDOWN */}
						{r.taxBreakdown?.length > 0 && (
							<>
								<hr className="border-[#01bdfc]/30" />

								<div className="space-y-2">
									<p className="text-[#f4ab17] font-semibold">Tax Breakdown</p>

									{r.taxBreakdown.map((b, i) => (
										<div key={i} className="flex justify-between text-xs">
											<span>{b.label}</span>

											<span>₦{b.tax.toLocaleString()}</span>
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</AnimatedCollapse>
			</CardFrame>
		</DashboradCardFrame>
	);
}
