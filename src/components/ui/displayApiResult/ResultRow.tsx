// =====================================
// src/components/ui/displayApiResult/ResultRow.tsx
// ===================================== API RESULT ROW
type ResultRowProps = {
	label: string;
	value: string | number | boolean | null | undefined;
};

// =====================================
export default function ResultRow({ label, value }: ResultRowProps) {
	const safeValue = value === null || value === undefined ? 0 : value;
	return (
		<div className="flex justify-between text-xs text-[#dbcfff]/90">
			<span>{label}</span>

			<span>
				{typeof safeValue === "number"
					? safeValue.toLocaleString()
					: String(safeValue)}
			</span>
		</div>
	);
}
