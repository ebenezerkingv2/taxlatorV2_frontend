// =====================================
// src/components/ui/displayApiResult/ResultRow.tsx
// ===================================== API RESULT ROW

type ResultRowProps = {
	label: string;
	shortLabel?: string;
	value: string | number | boolean | null | undefined;
};

// =====================================
export default function ResultRow({
	label,
	shortLabel,
	value,
}: ResultRowProps) {
	const safeValue = value === null || value === undefined ? 0 : value;

	return (
		<div className="flex justify-between text-md text-[#dbcfff]/90 font-bold">
			<span>
				<span className="md:hidden">{shortLabel ?? label}</span>
				<span className="hidden md:inline">{label}</span>
			</span>

			<span>
				{typeof safeValue === "number"
					? safeValue.toLocaleString()
					: String(safeValue)}
			</span>
		</div>
	);
}
