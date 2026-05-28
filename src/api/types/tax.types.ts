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
	calculationType: CalculationType;
	transactionType: TransactionType;
	vatRate: number;
};

// =============================== CIT META
export type CitMeta = BaseMeta & {
	companySize?: "SMALL" | "OTHER" | "MULTINATIONAL";
	appliedRate?: number;
	isMultinational?: boolean;
};

// =============================== PAYE / FREELANCER META
export type SimpleMeta = BaseMeta;

// =============================== UNION META
export type TaxMeta = VatMeta | CitMeta | SimpleMeta;

// =============================== TAX RESULT
type TaxResultBase = {
	grossAnnualIncome: number;
	taxableIncome: number;

	totalAnnualTax: number;
	monthlyTax: number;

	netAnnualIncome: number;
	netMonthlyIncome: number;

	taxBreakdown: TaxBreakdownItem[];

	deductions?: Record<string, number | boolean | string>;
};

// =============================== VAT RESULT
export type VatResult = TaxResultBase & {
	taxType: "VAT";
	meta: VatMeta;
};

// =============================== CIT RESULT
export type CitResult = TaxResultBase & {
	taxType: "CIT";
	meta: CitMeta;
};

// =============================== SIMPLE RESULT
export type SimpleResult = TaxResultBase & {
	taxType: "PAYE" | "FREELANCER";
	meta?: SimpleMeta;
};

// =============================== UNION
export type TaxResult = VatResult | CitResult | SimpleResult;

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
