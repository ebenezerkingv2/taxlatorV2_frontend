// =====================================
// src/components/ui/buttons/TaxOptionsButton.tsx
// ===================================== TAX OPTIONS BUTTON COMPONENT
import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useTaxModal } from "../../../context/useTaxModal";

// ===================================== DATA
type TaxOptionsButtonProps = HTMLMotionProps<"button"> & {
	children?: ReactNode;
	onClick?: () => void;
};

// ===================================== FUNCTION
export default function TaxOptionsButton({
	children = "Tax Options",
	className = "",
	onClick,
	...props
}: TaxOptionsButtonProps) {
	const { openModal } = useTaxModal();

	const handleClick = () => {
		onClick?.();
		openModal();
	};

	return (
		<motion.button
			onClick={handleClick}
			whileTap={{ scale: 0.90 }}
			transition={{ type: "spring", stiffness: 400, damping: 20 }}
			{...props}
			className={`relative cursor-pointer py-1 group font-bold overflow-hidden bg-black/30 hover:bg-white/10 ${className}`}
		>
			{/* ========================== TOP GLOW SPAN ======================= */}
			<span className="absolute left-0 top-0 w-0 h-[2px] bg-[#f4ab17] group-hover:w-full group-hover:shadow-[0_0_12px_#f4ab17] transition-all duration-400 ease-out" />

			{children}

			{/* ========================== BOTTOM GLOW SPAN ======================= */}
			<span className="absolute right-0 bottom-0 w-0 h-[2px] bg-[#01bdfc] w-full group-hover:shadow-[0_0_12px_#01bdfc] transition-all duration-400 ease-out" />
		</motion.button>
	);
}
