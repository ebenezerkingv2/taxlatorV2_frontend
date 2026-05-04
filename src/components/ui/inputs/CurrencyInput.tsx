// =====================================
// src/components/ui/inputs/CurrencyInput.tsx
// ===================================== CURRENCY INPUT COMPONENT

import type { ReactNode } from "react";
import { handleNumberInput } from "../../../utils/numberInput";
import InputField from "./InputField";

// ===================================== DATA
type CurrencyInputProps = {
	id: string;
	label: ReactNode;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	containerClassName?: string;
	inputClassName?: string;
};

// ===================================== FUNCTION
export default function CurrencyInput({
	id,
	label,
	value,
	onChange,
	placeholder = "0",
	containerClassName = "",
	inputClassName = "",
}: CurrencyInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = handleNumberInput(e.target.value);
		onChange(formatted);
	};

	return (
		<InputField
			id={id}
			label={label as string}
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
			leftElement="₦"
			containerClassName={containerClassName}
			inputClassName={inputClassName}
		/>
	);
}
