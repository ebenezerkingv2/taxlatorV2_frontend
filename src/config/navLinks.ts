// =====================================
// src/config/navLinks.ts
// ===================================== NAV LINKS DATA
export type NavLinkItem =
	| {
			type: "link";
			name: string;
			path: string;
	  }
	| {
			type: "tax-options";
	  }
	| {
			type: "action";
			name: string;
			action: "logout";
	  };

// =====================================
export function getNavLinks(isAuthenticated: boolean): NavLinkItem[] {
	if (isAuthenticated) {
		return [
			{ type: "link", name: "Home", path: "/" },
			{ type: "link", name: "TaxGuide", path: "/tax-guide" },
			{ type: "link", name: "Dashboard", path: "/dashboard" },
			{ type: "action", name: "SignOut", action: "logout" },
		];
	}

	return [
		{ type: "link", name: "Home", path: "/" },
		{ type: "tax-options" },
		{ type: "link", name: "TaxGuide", path: "/tax-guide" },
		{ type: "link", name: "Login", path: "/login-page" },
	];
}
