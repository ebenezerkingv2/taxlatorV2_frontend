// =====================================
// src/components/ui/animations/AnimatedCollapse.tsx
// =====================================
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

// ===================================== TYPES
type AnimatedCollapseProps = {
	show: boolean;
	children: ReactNode;
	className?: string;
	duration?: number;
};

type AnimatedFormCollapseProps = {
	show: boolean;
	children: ReactNode;
	className?: string;
	duration?: number;
};

// ===================================== BUTTON COLLAPSE
export function AnimatedCollapse({
	show,
	children,
	className = "",
	duration = 0.5,
}: AnimatedCollapseProps) {
	return (
		<AnimatePresence initial={false}>
			{show && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{
						height: "auto",
						opacity: 1,
						transition: {
							height: { duration, ease: [0.2, 0, 0.3, 1] },
							opacity: { duration },
						},
					}}
					exit={{
						height: 0,
						opacity: 0,
						transition: {
							height: { duration, ease: [0.2, 0, 0.3, 1] },
							// opacity: { duration: 2.15 },
						},
					}}
					className={`overflow-hidden ${className}`}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// ===================================== INPUT TOGGLE COLLAPSE
export function AnimatedFormCollapse({
	show,
	children,
	className = "",
	duration = 0.6,
}: AnimatedFormCollapseProps) {
	return (
		<AnimatePresence initial={false}>
			{show && (
				// ===================================== PARENT TOGGLE MOTION
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
					className={`overflow-hidden ${className}`}
				>
					{/* ===================================== CHILD MOTION HEIGHT */}
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{
							height: "auto",
							opacity: 1,
							transition: {
								height: { duration, ease: [0.2, 0, 0.3, 1] },
								opacity: { duration },
							},
						}}
						exit={{
							height: 0,
							opacity: 0,
							transition: {
								height: { duration, ease: [0.2, 0, 0.3, 1] },
								// opacity: { duration: 2.15 },
							},
						}}
						className={`overflow-hidden ${className}`}
					>
						<div className="pt-3 will-change-transform">{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
