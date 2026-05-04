// =====================================
// src/dashboard/dashPages/Dashboard.tsx
// ===================================== DASHBOARD COMPONENT
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import DashboardPageFrame from "../dashComponents/frames/DashBoardPageFrame";
import CardFrame from "../../ui/frames/CardFrame";
import TaxOptionsButton from "../../ui/buttons/TaxOptionsButton";

import { useDashboard } from "../dashHooks/useDashboard";
import { getSocket } from "../../../socket/socket";

// ===================================== TYPES
type RecentItem = {
	id: string;
	type: string;
	annualTax?: number;
	monthlyTax?: number;
};

// ===================================== TAX TIPS
const TAX_TIPS = [
	"File early to avoid last-minute penalties.",
	"Keep digital records of all income and expenses.",
	"Freelancers should separate business and personal accounts.",
	"VAT errors are one of the most common compliance mistakes.",
	"Always double-check your tax category before submitting.",
	"Saving 10–20% of income helps smooth tax payments.",
];

// ===================================== FUNCTION
export default function Dashboard() {
	const { data, isLoading } = useDashboard();
	const queryClient = useQueryClient();
	const [tipIndex, setTipIndex] = useState(0);

	// ===================================== LIVE SOCKET UPDATES
	useEffect(() => {
		const socket = getSocket();

		socket.on("dashboard:update", () => {
			queryClient.invalidateQueries({
				queryKey: ["dashboard"],
			});
		});

		return () => {
			socket.off("dashboard:update");
		};
	}, [queryClient]);

	// ===================================== TAX TIPS UPDATES
	useEffect(() => {
		const interval = setInterval(() => {
			setTipIndex((prev) => (prev + 1) % TAX_TIPS.length);
		}, 9000);

		return () => clearInterval(interval);
	}, []);

	// ===================================== LOADING STATE
	if (isLoading) {
		return (
			<DashboardPageFrame>
				<p className="text-[#dbcfff]/90">Loading Dashboard...</p>
			</DashboardPageFrame>
		);
	}

	// =====================================
	return (
		<DashboardPageFrame className="space-y-6">
			{/* ================= HEADER ================= */}
			<div>
				<h1 className="text-xl font-bold text-[#f4ab17]">Overview</h1>

				<p className="text-sm text-[#dbcfff]/70">Here’s your tax summary</p>
			</div>

			{/* ================= STATS ================= */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<CardFrame className="p-4">
					<h3 className="text-lg font-bold text-[#f4ab17] mb-2">
						Estimated Tax
					</h3>

					<h6 className="text-lg text-[#01bdfc] font-bold">
						₦{data?.estimatedTax?.toLocaleString()}
					</h6>
				</CardFrame>

				<CardFrame className="p-4">
					<h3 className="text-lg font-bold text-[#f4ab17] mb-2">
						Last Calculation
					</h3>

					<h6 className="text-lg text-[#01bdfc] font-bold">
						{data?.lastCalculation}
					</h6>
				</CardFrame>

				<CardFrame className="p-4">
					<h3 className="text-lg font-bold text-[#f4ab17] mb-2">
						Next Deadline
					</h3>

					<h6 className="text-lg text-[#01bdfc] font-bold">
						{data?.nextDeadline}
					</h6>
				</CardFrame>
			</div>

			{/* ================= CTA ================= */}
			<CardFrame className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
				<div>
					<h3 className="text-lg font-bold text-[#f4ab17] mb-2">
						Start a new calculation
					</h3>

					<p className="text-sm text-[#dbcfff]/90">
						Calculate your PAYE, FREELANCER, VAT, or CIT in seconds
					</p>
				</div>

				<TaxOptionsButton className="p-2">Tax Options</TaxOptionsButton>
			</CardFrame>

			{/* ================= RECENT ================= */}
			<CardFrame className="p-4">
				<h3 className="text-lg font-bold text-[#f4ab17] mb-4">
					Recent Calculations
				</h3>

				<div className="space-y-2 text-sm text-[#dbcfff]/90">
					{data?.recent?.slice(0, 5).map((item: RecentItem) => (
						<div
							key={item.id}
							className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-2 border-b border-[#dbcfff]/20 last:border-b-0"
						>
							{/* ================= TAX TYPE */}
							<div className="flex flex-col">
								<span className="text-xs text-[#dbcfff]/60">Tax Type</span>
								<span className="text-sm font-semibold text-[#dbcfff]">
									{item.type}
								</span>
							</div>

							{/* ================= ANNUAL TAX */}
							<div className="flex flex-col">
								<span className="text-xs text-[#dbcfff]/60">Annual Tax</span>
								<span className="text-sm font-semibold text-[#01bdfc]">
									₦{item.annualTax?.toLocaleString() ?? "0"}
								</span>
							</div>

							{/* ================= MONTHLY TAX */}
							<div className="flex flex-col">
								<span className="text-xs text-[#dbcfff]/60">Monthly Tax</span>
								<span className="text-sm font-semibold text-green-400">
									₦{item.monthlyTax?.toLocaleString() ?? "0"}
								</span>
							</div>
						</div>
					))}
				</div>
			</CardFrame>

			{/* ================= TAX TIPS ================= */}
			<CardFrame className="p-4 mt-4 font-bold">
				<h3 className="text-lg text-[#f4ab17] mb-2">💡 Tax Tip</h3>

				<div className="relative h-10 overflow-hidden">
					<p
						key={tipIndex}
						className="absolute text-sm text-[#dbcfff]/90 animate-fadeIn"
					>
						{TAX_TIPS[tipIndex]}
					</p>
				</div>
			</CardFrame>
		</DashboardPageFrame>
	);
}
