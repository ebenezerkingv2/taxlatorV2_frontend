// ====================================
// src/components/ui/buttons/GeneralButton.tsx
// ==================================== GENERAL BUTTON COMPONENT
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// ==================================== FUNCTION
type GeneralButtonProps = {
	children: React.ReactNode;
	className?: string;
	type?: "button" | "submit" | "reset";
	to?: string;
	disabled?: boolean;
	onClick?: () => void;
};

// ==================================== FUNCTION
export default function GeneralButton({
	children,
	className = "",
	type = "button",
	to,
	onClick,
}: GeneralButtonProps) {
	const baseStyles = `
		relative inline-block px-[1.2rem] py-[1rem] font-bold bg-black/30 hover:bg-black group cursor-pointer`;

	// ====================== NAVIGATION BUTTON
	if (to) {
		return (
			<NavLink to={to} className={`${baseStyles} ${className}`}>
				{children}

				<span className="absolute left-0 top-0 w-0 h-[2px] bg-[#f4ab17] transition-all duration-400 group-hover:w-full" />
				<span className="absolute right-0 bottom-0 w-0 h-[2px] bg-[#01bdfc] transition-all duration-400 group-hover:w-full" />
			</NavLink>
		);
	}

	// ====================== NORMAL / SUBMIT BUTTON
	return (
		<motion.button
			type={type}
			onClick={onClick}
			className={`border-t border-b border-t-[#f4ab17] border-b-[#01bdfc] ${baseStyles} ${className}`}
		>
			{children}

			<span className="absolute left-0 top-0 w-0 h-[2px] bg-[#f4ab17] transition-all duration-400 group-hover:w-full" />
			<span className="absolute right-0 bottom-0 w-0 h-[2px] bg-[#01bdfc] transition-all duration-400 group-hover:w-full" />
		</motion.button>
	);
}
