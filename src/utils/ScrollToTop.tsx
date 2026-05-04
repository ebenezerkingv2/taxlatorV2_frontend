// ===================================== FUNCTION
// src/components/utils/ScrollToTop.tsx
// ===================================== SCROLL TO TOP COMPONENT

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ===================================== FUNCTION
export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
