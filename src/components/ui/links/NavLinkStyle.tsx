// =====================================
// src/components/ui/links/NavLinkStyle.tsx
// ===================================== NAV LINKS STYLE UI COMPONENT

import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

// ===================================== DATA
type NavLinkProps = {
	to: string;
	children: ReactNode;
	className?: string;
	onClick?: () => void;
};

// ===================================== FUNCTION
export default function NavLinkStyle({
	to,
	children,
	className = "",
	onClick,
}: NavLinkProps) {
	return (
		<NavLink
			to={to}
			onClick={onClick}
			className={({ isActive }) =>
				`relative w-full block group font-bold py-2 md:py-0 transition-colors duration-400
				${isActive ? "bg-black" : "bg-black/30 hover:bg-black"} ${className}`
			}
		>
			{({ isActive }) => (
				<>
					{children}

					{/* ================= TOP LINE ================= */}
					<span
						className={`absolute left-0 top-0 h-[2px] bg-[#f4ab17] transition-all duration-400
						${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
					/>

					{/* ================= BOTTOM LINE ================= */}
					<span
						className={`absolute right-0 bottom-0 h-[2px] bg-[#01bdfc] transition-all duration-400
						${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
					/>
				</>
			)}
		</NavLink>
	);
}
