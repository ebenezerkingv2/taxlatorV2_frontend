// =====================================
// src/api/tax.api.ts
// =====================================
import api from "./axios";

import type {
	FreelancerInput,
	CITInput,
	VATInput,
	TaxResult,
	ApiResponse,
	PayeInput,
} from "../api/types/tax.types";

// ===================================== BASE REQUEST (UNIFIED)
const calculateTax = async <T>(
	taxType: string,
	data: T,
): Promise<TaxResult> => {
	// ===================================== AUTO SAVE IF TOKEN EXISTS
	const token = localStorage.getItem("token");

	const endpoint = token ? "/api/tax/calculate/save" : "/api/tax/calculate";

	const res = await api.post<ApiResponse<TaxResult>>(endpoint, {
		taxType,
		data,
	});

	return res.data.data;
};

// ===================================== PAYE
export const calculatePayeApi = (data: PayeInput) => {
	return calculateTax("PAYE", data);
};

// ===================================== FREELANCER
export const calculateFreelancerApi = (data: FreelancerInput) => {
	return calculateTax("FREELANCER", data);
};

// ===================================== CIT
export const calculateCitApi = (data: CITInput) => {
	return calculateTax("CIT", data);
};

// ===================================== VAT
export const calculateVatApi = (data: VATInput) => {
	return calculateTax("VAT", data);
};
