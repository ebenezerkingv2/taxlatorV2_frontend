// =====================================
// src/components/ui/animations/ResultTransition.tsx
// =====================================
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

// =====================================
type ResultTransitionProps = {
	show: boolean;
	children: ReactNode;
	empty?: ReactNode;
	className?: string;
	duration?: number;
};

// =====================================
export default function ResultTransition({
	show,
	children,
	empty,
	className = "",
	duration = 0.5,
}: ResultTransitionProps) {
	return (
		<AnimatePresence mode="wait">
			{!show ? (
				<motion.div
					key="empty"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration }}
					className={className}
				>
					{empty}
				</motion.div>
			) : (
				<motion.div
					key="result"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1.5, ease: "easeOut" }}
					className={className}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
