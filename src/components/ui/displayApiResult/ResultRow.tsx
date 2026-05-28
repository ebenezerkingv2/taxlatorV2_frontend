// =====================================
// src/components/ui/displayApiResult/ResultRow.tsx
// =====================================
import { useRef } from "react";
import SmartTooltip from "../../ui/toolTip/SmartTooltip";
import { useSmartTooltip } from "../../../hooks/useSmartTooltip";

type ResultRowProps = {
	label: string;
	shortLabel?: string;
	value: string | number | boolean | null | undefined;
};

export default function ResultRow({
	label,
	shortLabel,
	value,
}: ResultRowProps) {
	const { open, handlers } = useSmartTooltip(500);
	const rowRef = useRef<HTMLDivElement | null>(null);

	const safeValue = value === null || value === undefined ? 0 : value;

	return (
		<div
			ref={rowRef}
			className="relative flex justify-between text-md text-[#dbcfff] font-bold"
			{...handlers}
		>
			{/* LABEL */}
			<span>{shortLabel ?? label}</span>

			{/* VALUE */}
			<span>
				{typeof safeValue === "number"
					? safeValue.toLocaleString()
					: String(safeValue)}
			</span>

			{/* TOOLTIP */}
			<SmartTooltip open={open}>{label}</SmartTooltip>
		</div>
	);
}
