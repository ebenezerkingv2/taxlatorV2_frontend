// =====================================
// src/providers/AppProviders.tsx
// =====================================
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import TaxModalContext from "../context/TaxModalContext";
import TaxOptionsModal from "../components/modal/TaxOptionsModal";

import ScrollToTop from "../utils/ScrollToTop";
import AppRoutes from "../routes/AppRoutes";

import { UserProvider } from "../context/UserProvider";
import { AuthProvider } from "../context/AuthProvider";

import { TAX_ROUTES } from "../routes/taxRoutes";

// =====================================
const queryClient = new QueryClient();

// =====================================
export default function AppProviders() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation(); 

	const isDashboard = location.pathname.startsWith("/dashboard");

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<UserProvider>
					<TaxModalContext.Provider value={{ openModal }}>
						<ScrollToTop />
						<AppRoutes />

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
			</AuthProvider>
		</QueryClientProvider>
	);
}
