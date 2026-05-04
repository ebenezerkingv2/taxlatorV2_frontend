// ===================================== TAX TYPES
// src/api/types/tax.types.ts
// =====================================

// =============================== PAYE
export type PayeInput = {
	grossAnnualIncome: number;
	otherDeductions?: number;
	nationalHealthInsuranceScheme?: boolean;
	nationalHousingFund?: boolean;
	payePensionContribution?: boolean;
};

// =============================== FREELANCER
export type FreelancerInput = {
	grossAnnualIncome: number;
	totalBusinessExpenses?: number;
	pensionContribution?: number;
};

// =============================== CIT
export type CITInput = {
	annualTurnover: number;
	taxableProfit: number;
	fixedAssets?: number;
	accountingProfit?: number;
	companySize?: "SMALL" | "OTHER" | "MULTINATIONAL";
	isMultinational?: boolean;
	citRate?: number;
};

// =============================== VAT HELPERS
export type CalculationType = "ADD" | "REMOVE";
export type TransactionType = "DOMESTIC" | "DIGITAL" | "EXPORT" | "EXEMPT";

export type VATInput = {
	transactionAmount: number;
	calculationType: CalculationType;
	transactionType: TransactionType;
};

// =============================== TAX TYPE
export type TaxType = "PAYE" | "VAT" | "CIT" | "FREELANCER";

// =============================== BREAKDOWN
export type TaxBreakdownItem = {
	label: string;
	rate: number;
	taxableAmount: number;
	tax: number;
};

// =============================== META BASE
export type BaseMeta = {
	requestId: string;
	timestamp: string;
	saved?: boolean;
};

// =============================== VAT META
export type VatMeta = BaseMeta & {
	taxType: "VAT";
	calculationType: CalculationType;
	transactionType: TransactionType;
};

// =============================== CIT META
export type CitMeta = BaseMeta & {
	taxType: "CIT";
	companySize?: "SMALL" | "OTHER" | "MULTINATIONAL";
	appliedRate?: number;
	isMultinational?: boolean;
};

// =============================== PAYE / FREELANCER META
export type SimpleMeta = BaseMeta & {
	taxType: "PAYE" | "FREELANCER";
};

// =============================== UNION META
export type TaxMeta = VatMeta | CitMeta | SimpleMeta;

// =============================== TAX RESULT
export type TaxResult = {
	taxType: TaxType;

	grossAnnualIncome: number;
	taxableIncome: number;

	totalAnnualTax: number;
	monthlyTax: number;

	netAnnualIncome: number;
	netMonthlyIncome: number;

	taxBreakdown: TaxBreakdownItem[];

	deductions?: Record<string, number | boolean | string>;

	meta?: TaxMeta;
};

// =============================== API ERROR
export type ApiError = {
	message: string;
	code?: string;
	field?: string;
};

// =============================== API RESPONSE
export type ApiResponse<T> = {
	success: boolean;
	message?: string;
	data: T;
	meta: BaseMeta;
	errors?: ApiError[];
};

// =============================== HELPER (FIXED)
export const isMultinationalCompany = (
	value?: string | boolean | null,
): boolean => {
	return value === "MULTINATIONAL" || value === true;
};
