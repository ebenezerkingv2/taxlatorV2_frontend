// =====================================
// src/pages/components/dashboard/dashComponents/DashboardCardFrame.tsx
// ===================================== DASHBOARD CARD FRAME COMPONENT

import type { ReactNode } from "react";
import { motion } from "framer-motion";

// ===================================== DATA
type DashboradCardFrameProps = {
	id?: string;
	children: ReactNode;
	className?: string;
};

// ===================================== FUNCTION
export default function DashboradCardFrame({
	id,
	children,
	className = "",
}: DashboradCardFrameProps) {
	return (
		<motion.div
			id={id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				delay: 0.4,
				duration: 0.9,
				ease: [0.4, 0, 0.2, 1],
			}}
			className={`w-full ${className}`}
		>
			{children}
		</motion.div>
	);
}
