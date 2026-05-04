// =====================================
// src/components/ui/links/ExternalLink.tsx
// =====================================

import type { ReactNode } from "react";

// ==================================== DATA
type ExternalLinkProps = {
	href: string;
	children: ReactNode;
	className?: string;
};

// ==================================== FUNCTION
export default function ExternalLink({
	href,
	children,
	className = "",
}: ExternalLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
		>
			{children}
		</a>
	);
}
