// =====================================
// src/components/ui/toolTip/SmartTooltip.tsx
// =====================================
import { motion, AnimatePresence } from "framer-motion";

type Props = {
	open: boolean;
	children: React.ReactNode;
};

export default function SmartTooltip({ open, children }: Props) {
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 5 }}
					className="absolute left-1/2 -translate-x-1/2 -top-10 z-50"
				>
					<div className="bg-black text-white text-xs px-3 py-1 rounded-md shadow-lg border border-[#01bdfc]/40 whitespace-nowrap">
						{children}
					</div>

					<div className="w-2 h-2 bg-black rotate-45 mx-auto -mt-1 border-r border-b border-[#01bdfc]/40" />
				</motion.div>
			)}
		</AnimatePresence>
	);
}
