// =====================================
// src/dashboard/dashStore/DashboardStore.tsx
// ===================================== DASHBOARD STORE
import { create } from "zustand";

// =====================================
type RecentItem = {
	id: string;
	type: string;
	annualTax?: number;
	monthlyTax?: number;
};

// =====================================
type DashboardData = {
	estimatedTax: number;
	estimatedMonthlyTax: number;
	recent: RecentItem[];
};

// =====================================
type DashboardState = {
	estimatedTax: number;
	estimatedMonthlyTax: number;
	recent: RecentItem[];

	setInitial: (data: DashboardData) => void;

	patch: (data: { annualTax?: number; monthlyTax?: number }) => void;

	appendHistory: (item: RecentItem) => void;
};

// =====================================
export const useDashboardStore = create<DashboardState>((set) => ({
	estimatedTax: 0,
	estimatedMonthlyTax: 0,
	recent: [],

	setInitial: (data) =>
		set({
			estimatedTax: data.estimatedTax,
			estimatedMonthlyTax: data.estimatedMonthlyTax,
			recent: data.recent,
		}),

	patch: (data) =>
		set((state) => ({
			estimatedTax: state.estimatedTax + (data.annualTax ?? 0),
			estimatedMonthlyTax: state.estimatedMonthlyTax + (data.monthlyTax ?? 0),
		})),

	appendHistory: (item) =>
		set((state) => ({
			recent: [item, ...state.recent].slice(0, 5),
		})),
}));
