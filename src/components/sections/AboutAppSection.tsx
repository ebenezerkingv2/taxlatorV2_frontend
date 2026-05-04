// =====================================
// src/pages/components/sections/AboutAppSection.tsx
// ===================================== ABOUT APP SECTION COMPONENT

import AboutAppCard from "../../components/ui/cards/AboutAppCard";
import {
	HiOutlineChartPie,
	HiOutlineUsers,
	HiOutlineSparkles,
} from "react-icons/hi";
import { FiTarget } from "react-icons/fi";
import SectionFrame from "../ui/frames/SectionFrame";

// ===================================== DATA
const features = [
	{
		icon: <FiTarget size={25} className="w-[3.5rem]" />,
		title: "Accurate Calculations",
		description:
			"Powered by the latest tax rules, Taxlator ensures your results are correct and dependable.",
	},
	{
		icon: <HiOutlineChartPie size={25} className="w-[3.5rem]" />,
		title: "Instant Breakdown of Your Salary",
		description:
			"Get a clear, instant breakdown of taxes, deductions, and take-home pay.",
	},
	{
		icon: <HiOutlineUsers size={25} className="w-[3.5rem]" />,
		title: "Perfect for Workers, Students & Businesses",
		description:
			"Whether you're employed or self-employed, Taxlator helps you stay financially informed.",
	},
	{
		icon: <HiOutlineSparkles size={25} className="w-[3.5rem]" />,
		title: "Simple, Beautiful & Easy to Use",
		description:
			"Designed to remove confusion and make tax calculations effortless.",
	},
];

// ===================================== FUNCTION
export default function AboutAppSection() {
	return (
		<SectionFrame id="aboutAppSection">
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="text-center">
				{/* ================= TITLE ================= */}
				<h2 className="text-2xl md:text-3xl font-bold text-[#f4ab17]">
					About Taxlator
				</h2>

				<p className="mt-2 text-[#dbcfff]/90">What you should know about us</p>

				{/* ================= GRID ================= */}
				<div className="mt-[6rem] grid gap-8 md:grid-cols-2 text-left">
					{features.map((item) => (
						<AboutAppCard
							key={item.title}
							icon={item.icon}
							title={item.title}
							description={item.description}
						/>
					))}
				</div>
			</div>
		</SectionFrame>
	);
}
