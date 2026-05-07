// =====================================
// src/pages/components/ui/frames/heroFrame.tsx
// ===================================== HERO FRAME COMPONENT
import type { ReactNode } from "react";
import { motion } from "framer-motion";

// ===================================== DATA
type HeroFrameProps = {
	id?: string;
	children: ReactNode;
	className?: string;
	onAnimationComplete?: () => void;
};

// ===================================== FUNCTION
export default function HeroFrame({
	id,
	children,
	className = "",
	onAnimationComplete,
}: HeroFrameProps) {
	return (
		<motion.div
			id={id}
			initial={{ scale: 1.1, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 1.5, ease: "easeOut" }}
			onAnimationComplete={onAnimationComplete}
			className={`w-full ${className}`}
		>
			{children}
		</motion.div>
	);
}
