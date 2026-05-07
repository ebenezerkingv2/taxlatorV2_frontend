// =====================================
// src/components/dashboard/dashComponents/buttons/TaxTypeBadgeButton.tsx
// ===================================== TAX TYPE BADGE FOR BUTTONS
import type { TaxType } from "../../../../api/types/tax.types";

// =====================================
type TaxTypeBadgeButtonProps = {
	type: TaxType | "ALL";
	isActive?: boolean;
};

// =====================================
const styles: Record<TaxType | "ALL", string> = {
	ALL: "text-[#01bdfc]",

	PAYE: "text-white",

	VAT: "text-[#F1FF5E]",

	CIT: "text-[#6FCF97]",

	FREELANCER: "text-[#FF3737]",
};

// =====================================
export default function TaxTypeBadgeButton({
	type,
	isActive = false,
}: TaxTypeBadgeButtonProps) {
	return (
		<div
			className={`
				px-6 py-2 rounded-full border border-black shadow-[0_5px_5px_#dbcfff] text-xs font-bold transition-all duration-300
				${styles[type]}
				${isActive ? "bg-black scale-105" : "bg-gradient-to-b from-black via-[#000aff] to-black"}
			`}
		>
			{type}
		</div>
	);
}
