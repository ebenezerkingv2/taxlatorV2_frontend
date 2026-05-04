// =====================================
// src/components/dashboard/dashComponents/HistoryFilter.tsx
// ===================================== HISTORY FILTER COMPONENT

import type { TaxType } from "../types";
import { taxTypeConfig } from "../taxType.config";

// ===================================== DATA
type HistoryFilterType = "ALL" | TaxType;

type HistoryFilterProps = {
	setFilter: (val: HistoryFilterType) => void;
};

const filters: HistoryFilterType[] = [
	"ALL",
	"PAYE / PIT",
	"VAT",
	"CIT",
	"FREELANCER",
];

// ===================================== FUNCTION
export default function HistoryFilter({ setFilter }: HistoryFilterProps) {
	return (
		<div className="flex gap-4 flex-wrap">
			{/* ================= ALL ================= */}
			<button onClick={() => setFilter("ALL")}>ALL</button>

			{/* ================= TAX TYPES ================= */}
			{filters
				.filter((type): type is TaxType => type !== "ALL")
				.map((type) => {
					const config = taxTypeConfig[type];

					return (
						<button key={type} onClick={() => setFilter(type)}>
							{config.label}
						</button>
					);
				})}
		</div>
	);
}
