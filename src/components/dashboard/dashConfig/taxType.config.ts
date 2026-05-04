// =====================================
// src/components/dashboard/taxType.config.ts
// ===================================== TAX TYPE CONFIG
import type { TaxType } from "@taxlator/shared";

// ===================================== FUNCTION
export type TaxVariant = "ALL" | "PAYE" | "VAT" | "CIT" | "FREELANCER";

// ===================================== FUNCTION
export const taxTypeConfig: Record<
	TaxType | "ALL",
	{ label: string; variant: TaxVariant }
> = {
	ALL: { label: "ALL", variant: "ALL" },

	PAYE: {
		label: "PAYE / PIT",
		variant: "PAYE",
	},

	VAT: { label: "VAT", variant: "VAT" },

	CIT: { label: "CIT", variant: "CIT" },

	FREELANCER: { label: "FREELANCER", variant: "FREELANCER" },
};
