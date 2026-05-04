// ===================================== SMART DATE FORMATTER
// UTILS = R
// =====================================
type FormatMode = "absolute" | "relative" | "auto";

// =====================================
export function formatDate(date?: string, mode: FormatMode = "auto") {
	if (!date) return "N/A";

	const parsedDate = new Date(date);

	if (isNaN(parsedDate.getTime())) {
		return "N/A";
	}

	const now = Date.now();
	const diff = now - parsedDate.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	// ===================================== RELATIVE MODE
	if (mode === "relative") {
		if (days < 1) return "Today";
		if (days < 7) return `${days} day(s) ago`;
		if (days < 30) return `${Math.floor(days / 7)} week(s) ago`;

		return new Intl.DateTimeFormat("en-NG", {
			month: "short",
			year: "numeric",
		}).format(parsedDate);
	}

	// ===================================== ABSOLUTE MODE
	if (mode === "absolute") {
		return new Intl.DateTimeFormat("en-NG", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}).format(parsedDate);
	}

	// ===================================== AUTO MODE (BEST UX DEFAULT)
	// - recent → relative
	// - older → absolute
	if (days < 7) {
		if (days < 1) return "Today";
		return `${days} day(s) ago`;
	}

	return new Intl.DateTimeFormat("en-NG", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(parsedDate);
}
