// ====================================
// src/components/ui/buttons/CalculateTaxButton.tsx
// ====================================

type CalculateTaxButtonProps = {
	onClick: () => void;
	enabled?: boolean;
	loading?: boolean;
	label?: string;
	className?: string;
};

export default function CalculateTaxButton({
	onClick,
	enabled,
	loading = false,
	label = "Calculate Tax",
	className = "",
}: CalculateTaxButtonProps) {
	const isDisabled = !enabled || loading;

	return (
		<button
			onClick={onClick}
			disabled={isDisabled}
			className={`
				relative mt-6 w-full rounded-lg py-5 text-sm font-bold overflow-hidden transition-all duration-400

				${
					isDisabled
						? "bg-white/10 text-white text-[#dbcfff]/40 cursor-not-allowed"
						: " bg-gradient-to-b from-black via-[#000aff] to-black text-white hover:scale-[1.02] cursor-pointer"
				}

				${className}
			`}
		>
			{/* ============================== TOP GLOW */}
			<span className="absolute left-0 top-0 w-full h-[2px] bg-[#f4ab17] shadow-[0_0_12px_#f4ab17]" />

			{/* ============================== BOTTOM GLOW */}
			<span className="absolute right-0 bottom-0 w-full h-[2px] bg-[#01bdfc] shadow-[0_0_12px_#01bdfc]" />

			{/* ============================== CONTENT */}
			<span className="relative z-10">{label}</span>
		</button>
	);
}
