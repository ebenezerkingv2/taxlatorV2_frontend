// =====================================
// src/providers/AppProviders.tsx
// ===================================== APP PROVIDERS ROOT WRAPPER
import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import TaxModalContext from "../context/TaxModalContext";
import TaxOptionsModal from "../components/modal/TaxOptionsModal";

import ScrollToTop from "../utils/ScrollToTop";
import AppRoutes from "../routes/AppRoutes";

import { UserProvider } from "../context/UserProvider";
import { TAX_ROUTES } from "../routes/taxRoutes";

// ===================================== QUERY CLIENT (OPTIMIZED)
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes cache freshness
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

// =====================================
export default function AppProviders() {
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	// ===================================== ROUTE STATE
	const isDashboard = location.pathname.startsWith("/dashboard");

	// ===================================== MODAL HANDLERS
	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	// ===================================== MEMOIZED CONTEXT VALUE (PREVENT RE-RENDERS)
	const taxModalValue = useMemo(
		() => ({
			openModal,
		}),
		[],
	);

	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<TaxModalContext.Provider value={taxModalValue}>
					{/* ================= GLOBAL SCROLL RESET */}
					<ScrollToTop />

					{/* ================= ROUTES */}
					<AppRoutes />

					{/* ================= TAX MODAL */}
					<TaxOptionsModal
						open={open}
						onClose={closeModal}
						onPick={(type) => {
							closeModal();

							const route = isDashboard
								? TAX_ROUTES[type].dashboard
								: TAX_ROUTES[type].public;

							navigate(route);
						}}
					/>
				</TaxModalContext.Provider>
			</UserProvider>
		</QueryClientProvider>
	);
}
