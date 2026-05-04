// ===================================== SAFE IMAGE HELPER
// UTILS = R

// =====================================
export function safeImage(value?: string | null): string | undefined {
	if (!value || value.trim() === "") return undefined;
	return value;
}
