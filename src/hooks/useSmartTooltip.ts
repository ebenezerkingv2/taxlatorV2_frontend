// =====================================
// src/hooks/useSmartTooltip.ts
// =====================================
import { useRef, useState } from "react";

export function useSmartTooltip(delay = 500) {
	const [open, setOpen] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

	const handleEnter = () => {
		if (!isTouch) setOpen(true);
	};

	const handleLeave = () => {
		if (!isTouch) setOpen(false);
	};

	const handleTouchStart = () => {
		timerRef.current = setTimeout(() => {
			setOpen(true);
		}, delay);
	};

	const handleTouchEnd = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setOpen(false);
	};

	const handleTouchCancel = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setOpen(false);
	};

	return {
		open,
		handlers: {
			onMouseEnter: handleEnter,
			onMouseLeave: handleLeave,
			onTouchStart: handleTouchStart,
			onTouchEnd: handleTouchEnd,
			onTouchCancel: handleTouchCancel,
		},
	};
}
