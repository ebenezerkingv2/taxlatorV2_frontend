// ===============================
// src/routes/taxRoutes.ts
// =============================== TAX ROUTE MAP
export const TAX_ROUTES = {
	freelancer: {
		public: "/tax/freelancer",
		dashboard: "/dashboard/tax/freelancer",
	},

	payePit: {
		public: "/tax/payePit",
		dashboard: "/dashboard/tax/payePit",
	},

	cit: {
		public: "/tax/cit",
		dashboard: "/dashboard/tax/cit",
	},

	vat: {
		public: "/tax/vat",
		dashboard: "/dashboard/tax/vat",
	},
} as const;

// =============================== TYPE HELPERS (optional but useful)
export type TaxRouteKey = keyof typeof TAX_ROUTES;
