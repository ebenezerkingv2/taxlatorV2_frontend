// ====================================
// src/components/ui/buttons/CompanySizeSelectButton.tsx
// ====================================
import { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { AnimatedCollapse } from "../animations/AnimatedCollapse";

// =============================== FIX: UNIFY TYPES
export type CompanySize = "SMALL" | "OTHER" | "MULTINATIONAL";

const COMPANY_SIZE_OPTIONS: {
	value: CompanySize;
	label: string;
}[] = [
	{
		value: "SMALL",
		label: "Small Company (0%)",
	},
	{
		value: "OTHER",
		label: "Other Companies (30%)",
	},
	{
		value: "MULTINATIONAL",
		label: "Multinational Company (30% vs 15% Min. Tax)",
	},
];

type CompanySizeSelectProps = {
	value: CompanySize | "";
	onChange: (value: CompanySize) => void;
	containerClassName?: string;
};

export default function CompanySizeSelect({
	value,
	onChange,
	containerClassName = "",
}: CompanySizeSelectProps) {
	const [open, setOpen] = useState(false);

	const selectedLabel = value
		? COMPANY_SIZE_OPTIONS.find((o) => o.value === value)?.label
		: "Select Size";

	return (
		<div className={`mt-5 rounded-xl bg-black p-4 ${containerClassName}`}>
			<div className="mb-3">
				<div className="text-sm text-[#dbcfff]/90">Company Size</div>
				<div className="text-xs text-[#dbcfff]/70 mt-1 mb-3">
					Tax rate will be applied automatically
				</div>
			</div>

			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="w-full flex justify-between px-3 py-3 rounded-lg bg-gradient-to-b from-black via-[#000aff] to-black cursor-pointer"
			>
				<span className="text-sm">{selectedLabel}</span>
				<span
					className="flex items-center justify-center text-[#01bdfc] text-lg"
					style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
				>
					<BsFillCaretDownFill />
				</span>
			</button>

			<AnimatedCollapse show={open}>
				<div className="mt-3 rounded-lg overflow-hidden bg-black">
					{COMPANY_SIZE_OPTIONS.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => {
								onChange(option.value);
								setOpen(false);
							}}
							className="w-full text-left px-3 py-3 text-xs border-b border-[#01bdfc]/20 hover:bg-[#000aff]/50 cursor-pointer"
						>
							{option.label}
						</button>
					))}
				</div>
			</AnimatedCollapse>
		</div>
	);
}
