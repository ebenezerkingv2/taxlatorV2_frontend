// =====================================
// src/components/ui/cards/HowItWorksCard.tsx
// ===================================== HOW IT WORKS CARD UI COMPONENT

import CardFrame from "../frames/CardFrame";

type Props = {
	index: number;
	title: string;
	description: string;
};

// ===================================== FUNCTION
export default function HowItWorksCard({ index, title, description }: Props) {
	return (
		<CardFrame animate className="p-6 flex items-center gap-5">
			{/* ================= CONTENT ================= */}
			<div className="w-full h-full">
				<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4ab17] text-black font-bold transition-colors duration-300 group-hover:bg-[#01bdfc] group-hover:bg-[#01bdfc] group-hover:shadow-[0_0_15px_#01bdfc]">
					{index}
				</div>

				<h3 className="mt-6 text-lg font-bold text-[#f4ab17]">{title}</h3>

				<p className="mt-4 text-md lg:text-sm text-[#dbcfff]/90">
					{description}
				</p>
			</div>
		</CardFrame>
	);
}
