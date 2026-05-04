// =====================================
// src/components/dashboard/dashModal/ModalFrame.tsx
// =====================================
import type { ReactNode } from "react";

// =====================================
type ModalFrameProps = {
	children: ReactNode;
	title: string;
};

// =====================================
export default function ModalFrame({ children, title }: ModalFrameProps) {
	return (
		// ========================= OVERLAY
		<div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
			{/*========================= MAIN  */}
			<div
				className="relative w-full max-w-md rounded-2xl overflow-hidden 
					bg-gradient-to-b from-black via-[#000aff] to-black p-[2rem]"
			>
				{/*========================= TOP GLOW  */}
				<span className="absolute left-0 top-0 w-full h-[2px] bg-[#f4ab17] shadow-[0_0_20px_4px_#f4ab17]" />

				{/*========================= BOTTOM GLOW  */}
				<span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#01bdfc] shadow-[0_0_20px_4px_#01bdfc]" />

				{/*========================= MAIN  */}
				<h2 className="text-xl font-bold text-[#f4ab17] mb-4">{title}</h2>

				{children}
			</div>
		</div>
	);
}
