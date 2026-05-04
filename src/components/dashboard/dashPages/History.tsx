// =====================================
// src/dashboard/dashPages/History.tsx
// ===================================== HISTORY PAGE COMPONENT
import { useState } from "react";
import { motion } from "framer-motion";

import { useUser } from "../../../context/useUser";
import DashboardPageFrame from "../dashComponents/frames/DashBoardPageFrame";
import HistoryCard from "../dashComponents/cards/HistoryCard";
import { useHistory } from "../dashHooks/useHistory";
import TaxTypeBadgeButton from "../dashComponents/buttons/TaxTypeBadgeButton";
import type { TaxType } from "@taxlator/shared";

// =====================================
type HistoryFilterType = "ALL" | TaxType;

// =====================================
export default function HistoryPage() {
	const { user, loading: userLoading } = useUser();

	const { history, loading: historyLoading, filter, setFilter } = useHistory();

	const [expandedId, setExpandedId] = useState<string | null>(null);

	const filters: HistoryFilterType[] = [
		"ALL",
		"PAYE",
		"VAT",
		"CIT",
		"FREELANCER",
	];

	// =====================================
	const toggleExpand = (id: string) => {
		setExpandedId((prev) => (prev === id ? null : id));
	};

	// ===================================== LOADING STATE
	if (userLoading) {
		return (
			<DashboardPageFrame className="space-y-6 text-[#dbcfff]">
				<p className="text-sm text-white/60">Loading History...</p>
			</DashboardPageFrame>
		);
	}

	// ===================================== NO USER
	if (!user) {
		return (
			<DashboardPageFrame className="space-y-6 text-[#dbcfff]">
				<p className="text-sm text-white/60">
					User history could not be loaded
				</p>
			</DashboardPageFrame>
		);
	}

	// =====================================
	return (
		<DashboardPageFrame className="flex flex-col space-y-6 text-[#dbcfff]">
			{/* ================= HEADER ================= */}
			<div className="space-y-6">
				<div>
					<h1 className="text-xl font-bold text-[#f4ab17]">
						Calculation History
					</h1>

					<p className="text-sm text-[#dbcfff]/70">
						View all your past tax calculations
					</p>
				</div>

				{/* ================= FILTER ================= */}
				<div className="w-full max-w-6xl md:max-w-3xl mx-auto py-3 flex justify-evenly gap-4 flex-wrap">
					{filters.map((type) => (
						<motion.button
							key={type}
							onClick={() => setFilter(type)}
							whileTap={{ scale: 0.95 }}
							className="cursor-pointer"
						>
							<TaxTypeBadgeButton type={type} isActive={filter === type} />
						</motion.button>
					))}
				</div>
			</div>

			{/* ================= LIST ================= */}
			<div className="space-y-6 text-center">
				{historyLoading ? (
					<p className="text-[#dbcfff]/70">Loading history...</p>
				) : history.length === 0 ? (
					<p className="text-[#dbcfff]/70">No history found</p>
				) : (
					history.map((item) => (
						<HistoryCard
							key={item._id}
							item={item}
							isExpanded={expandedId === item._id}
							onToggle={() => toggleExpand(item._id)}
						/>
					))
				)}
			</div>
		</DashboardPageFrame>
	);
}
