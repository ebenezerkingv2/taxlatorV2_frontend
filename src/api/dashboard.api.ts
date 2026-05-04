// =====================================
// src/api/dashboard.api.ts
// ===================================== DASHBOARD API
import api from "./axios";

// =====================================
export async function getDashboardStatsApi() {
	const response = await api.get("/api/dashboard");

	return response.data.data;
}