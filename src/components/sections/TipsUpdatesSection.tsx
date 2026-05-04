// =====================================
// src/pages/components/sections/TipsUpdatesSection.tsx
// ===================================== TIPS AND UPDATES SECTION COMPONENT

import payePit from "../../assets/images/paye-pit.webp";
import freelancer from "../../assets/images/freelancer.webp";
import cit from "../../assets/images/company-income-tax.webp";
import TipsUpdatesCard from "../../components/ui/cards/TipsUpdatesCard";
import SectionFrame from "../ui/frames/SectionFrame";

// ===================================== DATA
const tips = [
	{
		image: payePit,
		tag: "PAYE/PIT",
		title: "Understanding PAYE Tax Bands in Nigeria",
		description:
			"Learn how progressive tax rates from 7% to 24% apply to your income and what it means for your take-home pay.",
	},
	{
		image: freelancer,
		tag: "FREELANCER",
		title: "Tax Tips for Freelancers and Self-Employed",
		description:
			"Discover legitimate business expenses you can deduct and how to optimize your tax payments as a freelancer.",
	},
	{
		image: cit,
		tag: "COMPANY INCOME TAX",
		title: "Company Income Tax: What Business Owners Should Know",
		description:
			"A comprehensive guide to CIT rates, allowable deductions, and compliance requirements for Nigerian businesses.",
	},
];

// ===================================== FUNCTION
export default function TipsUpdatesSection() {
	return (
		<SectionFrame id="tipsUpdatesSection">
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="text-center">
				{/* ================= SECTION TITLE ================= */}
				<h2 className="text-2xl md:text-3xl font-bold text-[#f4ab17]">
					Latest Tax Tips & Updates
				</h2>

				<p className="mt-2 text-[#dbcfff]/90">
					Stay informed with helpful tax guides and insights
				</p>

				{/* ================= SECTION BACKGROUND IMAGES ================= */}

				{/* ================= CARDS ================= */}
				<div className="mt-[6rem] grid gap-8 md:grid-cols-3 text-left">
					{tips.map((item) => (
						<TipsUpdatesCard
							key={item.title}
							tag={item.tag}
							title={item.title}
							description={item.description}
							image={item.image}
						/>
					))}
				</div>
			</div>
		</SectionFrame>
	);
}
