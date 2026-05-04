// =====================================
// src/pages/otherPages/TaxGuide.tsx
// ===================================== TAX GUIDE COMPONENT

import { useNavigate } from "react-router-dom";
import GeneralButton from "../../components/ui/buttons/GeneralButton";
import LegalAuthFrame from "../../components/ui/frames/LegalAuthFrame";

// ===================================== BOOK ICON (MATCH OTHER PAGES)
function BookIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none">
			<path
				d="M12 6.4c-2.2-1.6-5.4-1.9-8-1.4v13.9c2.6-.6 5.8-.2 8 1.4m0-13.9c2.2-1.6 5.4-1.9 8-1.4v13.9c-2.6-.6-5.8-.2-8 1.4"
				stroke="currentColor"
				strokeWidth="1.7"
			/>
			<path d="M12 6.6v13.6" stroke="currentColor" strokeWidth="1.7" />
		</svg>
	);
}

// ================= TAG
function Tag({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center rounded-full bg-black/40 border border-[#01bdfc]/30 px-3 py-1 text-[11px] text-[#dbcfff]/80">
			{children}
		</span>
	);
}

// ================= GUIDE CARD
function GuideCard({
	title,
	description,
	tags,
}: {
	title: string;
	description: string;
	tags: string[];
}) {
	return (
		<div className="relative rounded-2xl bg-gradient-to-b from-black via-[#000aff] to-black p-5 border border-[#01bdfc]/10">
			{/* ================= CONTENT ================= */}
			<div>
				<h2 className="text-[#01bdfc] font-semibold text-sm">{title}</h2>

				<p className="mt-2 text-sm text-[#dbcfff]/90 leading-relaxed">
					{description}
				</p>

				<div className="mt-4 flex flex-wrap gap-2">
					{tags.map((t) => (
						<Tag key={t}>{t}</Tag>
					))}
				</div>
			</div>
		</div>
	);
}

// ================= PAGE
export default function TaxGuide() {
	const navigate = useNavigate();

	return (
		<div id="taxGuide" className="bg-black py-16 overflow-hidden w-full">
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="taxGuide-parent w-full max-w-7xl mx-auto px-4">
				{/* ================= HEADER ================= */}
				<div className="text-center mb-6">
					<div className="flex justify-center text-[#01bdfc]">
						<BookIcon className="h-9 w-9 shadow-[0_0_20px_4px_#01bdfc]" />
					</div>

					<h1 className="text-2xl font-bold text-[#f4ab17] mt-2">
						Tax Guides & Resources
					</h1>

					<p className="text-xs text-[#dbcfff]/90 mt-1">
						Learn Nigerian tax rules, calculations, and compliance basics
					</p>
				</div>
				{/* ================= FRAME + CARD ================= */}
				<LegalAuthFrame className="w-full max-w-2xl mx-auto rounded-2xl bg-gradient-to-b from-black via-[#000aff] to-black p-6">
					{/* ================= CONTENT ================= */}
					<div className="space-y-5">
						<GuideCard
							title="Understanding PAYE"
							description="Learn how Pay As You Earn (PAYE) works, including tax bands, deductions, and how monthly salary tax is calculated."
							tags={[
								"Tax bands",
								"Pension deduction (8%)",
								"CRA allowance",
								"Monthly vs Annual tax",
							]}
						/>

						<GuideCard
							title="Personal Income Tax (PIT)"
							description="A breakdown of annual tax obligations for both salaried and self-employed individuals in Nigeria."
							tags={[
								"Annual filing",
								"Reliefs & deductions",
								"Tax rates structure",
								"FIRS compliance",
							]}
						/>

						<GuideCard
							title="Freelancer Tax Guide"
							description="Everything freelancers need to know about managing income tax, record keeping, and estimated payments."
							tags={[
								"Self-employed income",
								"Expense tracking",
								"Tax planning",
								"Quarterly estimates",
							]}
						/>

						<GuideCard
							title="Value Added Tax (VAT)"
							description="Understand VAT registration, charging rules, exemptions, and remittance requirements in Nigeria."
							tags={[
								"7.5% VAT rate",
								"Registration threshold",
								"Taxable goods/services",
								"Filing process",
							]}
						/>

						<GuideCard
							title="Company Income Tax (CIT)"
							description="Guide for businesses on how company income tax is calculated, allowances, and filing obligations."
							tags={[
								"CIT rates",
								"Allowable expenses",
								"Capital allowances",
								"Corporate filing",
							]}
						/>
					</div>
				</LegalAuthFrame>

				{/* ================= BUTTON ================= */}
				<div className="mt-8 flex justify-center">
					<GeneralButton
						onClick={() => navigate("/")}
						className="cursor-pointer mt-10"
					>
						Back to Home
					</GeneralButton>
				</div>
			</div>
		</div>
	);
}
