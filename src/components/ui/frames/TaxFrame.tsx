// =====================================
// src/components/ui/frames/TaxFrame.tsx
// ===================================== TAX FRAME COMPONENT

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// ===================================== TYPES
type TaxFrameProps = {
	children: ReactNode;
	className?: string;
};

// ===================================== FUNCTION
export default function TaxFrame({ children, className = "" }: TaxFrameProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.9,
				ease: "easeOut",
			}}
			className={`
				w-full max-w-7xl mx-auto px-4
				py-4
				${className}
			`}
		>
			{children}
		</motion.div>
	);
}
