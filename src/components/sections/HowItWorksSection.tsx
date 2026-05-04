// =====================================
// src/pages/components/sections/HowItWorksSection.tsx
// ===================================== HOW IT WORKS SECTION COMPONENT

import HowItWorksCard from "../../components/ui/cards/HowItWorksCard";
import SectionFrame from "../ui/frames/SectionFrame";

// ===================================== DATA
const steps = [
	{
		title: "Choose Your Tax Type",
		description: "Select from PAYE/PIT, Freelancer, Company Income Tax or VAT",
	},
	{
		title: "Enter Your Income & Deductions",
		description: "Input your gross income and any eligible deductions.",
	},
	{
		title: "See Your Tax Breakdown Instantly",
		description: "Get instant results with detailed breakdowns.",
	},
];

// ===================================== FUNCTION
export default function HowItWorksSection() {
	return (
		<SectionFrame id="howItWorksSection">
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="text-center">
				{/* ================= SECTION TITLE ================= */}
				<h2 className="text-2xl md:text-3xl font-bold text-[#f4ab17]">
					How It Works?
				</h2>

				<p className="mt-2 text-[#dbcfff]/90">
					Just three steps to calculate your tax
				</p>

				{/* ================= CARDS ================= */}
				<div className="mt-[6rem] grid gap-8 md:grid-cols-3 text-left">
					{steps.map((step, i) => (
						<HowItWorksCard
							key={step.title}
							index={i + 1}
							title={step.title}
							description={step.description}
						/>
					))}
				</div>
			</div>
		</SectionFrame>
	);
}
