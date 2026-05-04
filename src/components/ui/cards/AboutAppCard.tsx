// =====================================
// src/components/ui/cards/AboutAppCard.tsx
// ===================================== ABOUT APP CARD UI COMPONENT

import type { ReactNode } from "react";
import CardFrame from "../frames/CardFrame";

type Props = {
	icon: ReactNode;
	title: string;
	description: string;
};

export default function AboutAppCard({ icon, title, description }: Props) {
	return (
		<CardFrame animate className="p-6 flex items-center gap-5">
			{/* ================= ICON ================= */}
			<div className="flex items-center justify-center h-[4.5rem] rounded-xl bg-[#f4ab17] group-hover:bg-[#01bdfc] transition-all duration-300">
				<div className="text-black flex items-center justify-center">
					{icon}
				</div>
			</div>

			{/* ================= TEXT ================= */}
			<div className="relative z-10">
				<h3 className="font-semibold text-base text-[#f4ab17]">{title}</h3>

				<p className="mt-2 text-sm text-[#dbcfff]/90 leading-relaxed">
					{description}
				</p>
			</div>
		</CardFrame>
	);
}
