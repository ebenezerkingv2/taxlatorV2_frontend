// =====================================
// src/utils/numberFormat.ts
// =====================================

// ONLY NUMBERS
export function onlyNumbers(value: string): string {
	return value.replace(/\D/g, "");
}

// FORMAT NUMBER (1,000,000)
export function formatNumber(value: string): string {
	if (!value) return "";

	const cleaned = value.replace(/,/g, "");
	if (!cleaned) return "";

	const n = Number(cleaned);
	if (!Number.isFinite(n)) return "";

	return n.toLocaleString("en-NG");
}

// PARSE NUMBER
export function parseNumber(value: string): number {
	const cleaned = value.replace(/,/g, "");
	if (!cleaned) return 0;

	const n = Number(cleaned);
	return Number.isFinite(n) ? n : 0;
}

// CURRENCY FORMAT (FIXED)
export function formatCurrency(amount: number): string {
	if (!Number.isFinite(amount)) return "₦0";
	return `₦${amount.toLocaleString("en-NG")}`;
}

// HANDLE INPUT
export function handleNumberInput(value: string): string {
	const numbersOnly = onlyNumbers(value);
	return formatNumber(numbersOnly);
}
