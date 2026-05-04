// =====================================
// src/pages/components/dashboard/dashComponents/frames/DashboardPageFrame.tsx
// ===================================== DASHBOARD PAGE FRAME COMPONENT

import type { ReactNode } from "react";
import { motion } from "framer-motion";

// ===================================== DATA
type DashboardPageFrameProps = {
	id?: string;
	children: ReactNode;
	className?: string;
	onAnimationComplete?: () => void;

};

// ===================================== FUNCTION
export default function DashboardPageFrame({
	id,
	children,
	className = "",
	onAnimationComplete,
}: DashboardPageFrameProps) {
	return (
		<motion.div
			id={id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			onAnimationComplete={onAnimationComplete}
			transition={{ duration: 1.5, ease: "easeOut" }}
			className={`w-full ${className}`}
		>
			{children}
		</motion.div>
	);
}
