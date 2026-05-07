// =====================================
// src/components/ui/inputs/InputField.tsx
// =====================================
import { useState, type ReactNode } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeClosedDuotone } from "react-icons/pi";

// =====================================
type InputFieldProps = {
	id: string;
	label: string;
	type?: string;
	value: string;
	autoComplete?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	leftElement?: ReactNode;
	containerClassName?: string;
	inputClassName?: string;
};

// =====================================
export default function InputField({
	id,
	label,
	type = "text",
	value,
	autoComplete,
	onChange,
	placeholder = "",
	leftElement,
	containerClassName = "",
	inputClassName = "",
}: InputFieldProps) {
	const [showPassword, setShowPassword] = useState(false);
	const isPassword = type === "password";

	return (
		<div className={`space-y-1 ${containerClassName}`}>
			{/* ===================== LABEL */}
			<label htmlFor={id} className="text-sm text-[#dbcfff]/90 ml-[0.2rem]">
				{label}
			</label>

			{/* ===================== INPUT WRAPPER */}
			<div className="relative mt-1">
				{leftElement && (
					<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#dbcfff]/70 text-sm">
						{leftElement}
					</span>
				)}

				{/* ===================== INPUT */}
				<input
					id={id} 
					type={isPassword && showPassword ? "text" : type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					autoComplete={autoComplete}
					className={`w-full rounded-lg py-3 pr-3 bg-black/50 border border-[#01bdfc]/50 focus:outline-none focus:border-[#f4ab17]/50 text-[#dbcfff] ${
						leftElement ? "pl-8" : "pl-3"
					} ${inputClassName}`}
				/>

				{/* ===================== PASSWORD TOGGLE */}
				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword((p) => !p)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-[#dbcfff] cursor-pointer"
					>
						{showPassword ? (
							<RxEyeOpen size={20} className="text-[#f4ab17]" />
						) : (
							<PiEyeClosedDuotone size={20} className="text-[#f4ab17]" />
						)}
					</button>
				)}
			</div>
		</div>
	);
}
