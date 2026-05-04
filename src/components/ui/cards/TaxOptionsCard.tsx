// =====================================
// src/components/ui/cards/TaxOptionsCard.tsx
// ===================================== TAX OPTIONS CARD

import type { ReactNode } from "react";

// ===================================== DATA
interface TaxOptionsCardProps {
	title: string;
	desc: string;
	icon: ReactNode;
	onClick: () => void;
}

// ===================================== FUNCTION
const TaxOptionsCard = ({
	title,
	desc,
	icon,
	onClick,
}: TaxOptionsCardProps) => {
	return (
		<button
			onClick={onClick}
			className="group w-full text-left rounded-xl p-[1px] border border-{#01bdfc} hover:border-[#f4ab17] hover:scale-[1.03] active:scale-[0.98] transition cursor-pointer"
		>
			<div className="rounded-xl bg-black/50 p-4 flex items-center gap-4">
				{/* ================ ICONS ================ */}
				<div
					className="w-12 h-12 flex-shrink-0 rounded-lg grid place-items-center 
					bg-black text-[#01bdfc] group-hover:text-[#f4ab17] text-xl shadow-[0_0_12px_#01bdfc] group-hover:shadow-[0_0_12px_#f4ab17] transition"
				>
					{icon}
				</div>

				{/* ================ TEXTS ================ */}
				<div>
					<div className="text-sm font-semibold text-[#01bdfc] group-hover:text-[#f4ab17] transition">
						{title}
					</div>
					<div className="text-xs text-[#dbcfff]/90 group-hover:text-[#dbcfff] transition mt-1">
						{desc}
					</div>
				</div>
			</div>
		</button>
	);
};

export default TaxOptionsCard;
