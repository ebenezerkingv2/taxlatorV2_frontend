// =====================================
// src/components/ui/displayApiResult/ResultCard.tsx
// =====================================
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import ResultTransition from "../animations/ResultTransition";

// =====================================
type ResultCardProps<T> = {
	result: T | null;
	children: ReactNode;
	title?: string;
	className?: string;
	emptyMessage?: string;
};

// =====================================
export default function ResultCard<T>({
	result,
	children,
	title = "Result",
	className = "",
	emptyMessage = "Enter values and calculate",
}: ResultCardProps<T>) {
	return (
		<motion.div
			layout
			className={`relative rounded-2xl p-6 bg-black ${className}`}
		>
			<ResultTransition
				show={!!result}
				empty={
					<p className="text-[#dbcfff]/90 text-sm text-center">
						{emptyMessage}
					</p>
				}
				className="space-y-4 text-sm"
			>
				<>
					<h3 className="text-lg font-bold mb-11 text-[#01bdfc]">{title}</h3>
					{children}
				</>
			</ResultTransition>
		</motion.div>
	);
}
