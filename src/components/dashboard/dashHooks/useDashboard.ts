// ===================================== DASHBOARD HOOK
// src/components/dashboard/dashHooks/useDashboard.ts
// =====================================
import { useQuery } from "@tanstack/react-query";
import { getDashboardStatsApi } from "../../../api/dashboard.api";

// =====================================
export function useDashboard() {
	return useQuery({
		queryKey: ["dashboard"],
		queryFn: getDashboardStatsApi,
	});
}