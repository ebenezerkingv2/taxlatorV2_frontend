// ===================================== USE HISTORY
// src/components/dashboard/dashHooks/useHistory.ts
// =====================================
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { TaxType } from "../../../api/types/tax.types";
import { getHistoryApi, type HistoryResponse } from "../../../api/history.api";
import type { TaxHistoryItem } from "../../../api/history.api";

// =====================================
type FilterType = "ALL" | TaxType;

// =====================================
export function useHistory() {
	// ================= UI STATE ONLY
	const [filter, setFilter] = useState<FilterType>("ALL");
	const [page, setPage] = useState(1);
	const [limit] = useState(10);

	// ================= REACT QUERY
	const { data, isLoading, isFetching, refetch } = useQuery<HistoryResponse>({
		queryKey: ["history", filter, page, limit],

		queryFn: () =>
			getHistoryApi({
				page,
				limit,
				taxType: filter === "ALL" ? undefined : filter,
			}),

		// ================= PERFORMANCE
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30,

		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	});

	// ================= DATA
	const history: TaxHistoryItem[] = data?.records ?? [];

	const totalPages = data?.pagination?.totalPages ?? 1;

	return {
		history,

		loading: isLoading,
		fetching: isFetching,

		filter,
		setFilter,

		page,
		setPage,

		totalPages,

		refresh: refetch,
	};
}
