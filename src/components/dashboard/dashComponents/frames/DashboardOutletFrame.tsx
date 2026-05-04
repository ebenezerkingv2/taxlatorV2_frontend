// =====================================
// src/pages/components/dashboard/dashComponents/frames/DashboardOutletFrame.tsx
// ===================================== DASHBOARD OUTLET FRAME COMPONENT

import type { ReactNode } from "react";
import { motion } from "framer-motion";

// ===================================== DATA
type DashboradOutletFrameProps = {
	id?: string;
	children: ReactNode;
	className?: string;
	startAnimation?: boolean;
};

// ===================================== FUNCTION
export default function DashboradOutletFrame({
	id,
	children,
	className = "",
	startAnimation = false,
}: DashboradOutletFrameProps) {
	return (
		<motion.div
			id={id}
			initial={{ opacity: 0, y: 20, scale: 0.85 }}
			animate={{
				opacity: startAnimation ? 1 : 0,
				y: startAnimation ? 0 : 20,
				scale: startAnimation ? 1 : 0.85,
			}}
			transition={{
				duration: 0.9,
				ease: [0.10, 1, 0.40, 1],
				delay: startAnimation ? 0.2 : 0,
			}}
			className={`w-full ${className}`}
		>
			{children}
		</motion.div>
	);
}
