// =====================================
// src/api/history.api.ts
// =====================================
import api from "./axios";
import type { ApiResponse, TaxResult } from "../api/types/tax.types";

// =====================================
export type TaxHistoryItem = {
	_id: string;
	taxType: string;
	inputSnapshot: Record<string, unknown>;
	outputSnapshot: TaxResult;
	createdAt: string;
};

// =====================================
export type HistoryResponse = {
	records: TaxHistoryItem[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
};

// =====================================
export const getHistoryApi = async (params?: {
	page?: number;
	limit?: number;
	taxType?: string;
}) => {
	const res = await api.get<ApiResponse<HistoryResponse>>("/api/user/history", {
		params,
	});

	return res.data.data;
};
