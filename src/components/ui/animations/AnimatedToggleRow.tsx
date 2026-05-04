// =====================================
// src/components/ui/animations/AnimationToggleRow.tsx
// =====================================
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

// =====================================
type AnimatedToggleRowProps = {
	show: boolean;
	children: ReactNode;
	className?: string;
};

// =====================================
export function AnimatedToggleRow({
	show,
	children,
	className = "",
}: AnimatedToggleRowProps) {
	return (
		<AnimatePresence initial={false}>
			{show && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: {
							duration: 1.5,
							ease: "easeOut",
						},
					}}
					exit={{
						opacity: 0,
						transition: {
							duration: 1.5,
							ease: "easeOut",
						},
					}}
					className={className}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
