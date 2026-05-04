// =====================================
// src/components/ui/cards/TipsUpdatesCard.tsx
// ===================================== TIPS AND UPDATES CARD UI COMPONENT
import CardFrame from "../frames/CardFrame";

// =====================================
type Props = {
	image: string;
	tag: string;
	title: string;
	description: string;
};

// ===================================== FUNCTION
export default function TipsUpdatesCard({
	image,
	tag,
	title,
	description,
}: Props) {
	return (
		<CardFrame animate>
			{/* ================= IMAGE ================= */}
			<div className="h-56 flex items-center justify-center bg-black/40">
				<img
					src={image}
					alt={title}
					className="max-h-full max-w-full object-contain"
				/>
			</div>

			{/* ================= CONTENT ================= */}
			<div className="p-6 relative z-10">
				{/* ============================ TAG */}
				<span className="inline-block rounded-[0.5rem] bg-[#f4ab17] text-black px-3 py-1 text-md font-semibold mb-3 transition-all duration-300 group-hover:bg-[#01bdfc] group-hover:shadow-[0_0_10px_#01bdfc]">
					{tag}
				</span>

				<h3 className="text-lg font-semibold text-[#f4ab17]">{title}</h3>

				<p className="mt-3 text-sm text-[#dbcfff]/90 leading-relaxed">
					{description}
				</p>

				{/* ============================ CTA */}
				<div className="mt-5 text-sm font-semibold text-[#f4ab17] group-hover:text-[#01bdfc] transition-colors duration-300">
					Read More <span>→</span>
					<span className="ml-2 text-gray-400">(coming soon)</span>
				</div>
			</div>
		</CardFrame>
	);
}
