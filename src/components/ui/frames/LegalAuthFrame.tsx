// =====================================
// src/components/ui/frames/LegalAuthFrame.tsx
// ===================================== LEGAL AUTH FRAME COMPONENT

import type { ReactNode } from "react";
import HeroFrame from "../frames/HeroFrame";

// ===================================== DATA
type LegalAuthFrameProps = {
	children: ReactNode;
	className?: string;
	id?: string;
};

// ===================================== FUNCTION
export default function LegalAuthFrame({
	children,
	className = "",
	id = "",
}: LegalAuthFrameProps) {
	return (
		<HeroFrame id={id} className={`relative ${className}`}>
			{/* ================= LEFT LINE ================= */}
			<span className="absolute left-0 top-0 w-[2px] h-full bg-[#f4ab17] shadow-[0_0_20px_4px_#f4ab17]" />

			{/* ================= RIGHT LINE ================= */}
			{/* <span className="absolute right-0 top-0 w-[2px] h-full bg-[#01bdfc] shadow-[0_0_20px_4px_#01bdfc]" /> */}

			{/* ================= CONTENT ================= */}
			{children}
		</HeroFrame>
	);
}
