// =====================================
// src/components/ui/links/FooterLink.tsx
// =====================================

import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

// ==================================== DATA
type FooterLinkProps = {
	to: string;
	children: ReactNode;
};

// ==================================== FUNCTION
export default function FooterLink({ to, children }: FooterLinkProps) {
	return (
		<NavLink
			to={to}
			className="relative inline-block w-fit group text-sm opacity-80 hover:opacity-100 transition-all duration-400 cursor-pointer"
		>
			{children}

			<span className="absolute left-0 top-0 w-0 h-[1px] bg-[#f4ab17] transition-all duration-400 group-hover:w-full"></span>

			<span className="absolute right-0 bottom-0 w-0 h-[1px] bg-[#01bdfc] transition-all duration-400 group-hover:w-full"></span>
		</NavLink>
	);
}
