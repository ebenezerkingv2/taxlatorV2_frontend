// =====================================
// src/routes/AppRoutes.tsx
// ===================================== APP ROUTES CONFIGURATION
// =====================================
import { Routes, Route } from "react-router-dom";

// ===================================== LAYOUTS
import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/dashboard/dashLayout/DashboardLayout";

// ===================================== PUBLIC PAGES
import LandingPageLayout from "../pages/landingPage/LandingPageLayout";

import PayePit from "../pages/taxPages/PayePit";
import Freelancer from "../pages/taxPages/Freelancer";
import CIT from "../pages/taxPages/CIT";
import VAT from "../pages/taxPages/VAT";

// ===================================== LEGAL PAGES
import PrivacyPolicy from "../pages/otherPages/Privacy_Policy";
import TermsConditions from "../pages/otherPages/Terms_Conditions";
import AboutUs from "../pages/otherPages/AboutUs";
import TaxGuide from "../pages/otherPages/TaxGuide";

// ===================================== AUTH PAGES
import LoginPage from "../pages/authPages/LoginPage";
import SignUpPage from "../pages/authPages/SignUpPage";

// ===================================== DASHBOARD PAGES
import Dashboard from "../components/dashboard/dashPages/Dashboard";
import HistoryPage from "../components/dashboard/dashPages/History";
import ProfilePage from "../components/dashboard/dashPages/Profile";

// ===================================== ROUTE GUARD
import ProtectedRoute from "./ProtectedRoute";

// ===================================== ROUTE CONSTANTS
import { TAX_ROUTES } from "./taxRoutes";

// ===================================== REQUIRE ROLE
import RequireRole from "../components/dashboard/dashLayout/RequireRole";

// ===================================== ADMIN DASHBOARD
import AdminDashboard from "../components/dashboard/dashLayout/AdminDashboard";

// =====================================
export default function AppRoutes() {
	return (
		<Routes>
			{/* ===================================== PUBLIC LAYOUT */}
			<Route element={<PublicLayout />}>
				<Route path="/" element={<LandingPageLayout />} />

				{/* ================= TAX PUBLIC */}
				<Route path="/tax/payePit" element={<PayePit />} />
				<Route path="/tax/freelancer" element={<Freelancer />} />
				<Route path="/tax/cit" element={<CIT />} />
				<Route path="/tax/vat" element={<VAT />} />

				{/* ================= LEGAL */}
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms-conditions" element={<TermsConditions />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/tax-guide" element={<TaxGuide />} />

				{/* ================= AUTH */}
				<Route path="/login-page" element={<LoginPage />} />
				<Route path="/signUp-page" element={<SignUpPage />} />
			</Route>

			{/* ===================================== DASHBOARD (PROTECTED) */}
			<Route
				element={
					<ProtectedRoute>
						<DashboardLayout />
					</ProtectedRoute>
				}
			>
				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<RequireRole allowed={["ADMIN"]}>
								<AdminDashboard />
							</RequireRole>
						</ProtectedRoute>
					}
				/>

				{/* ================= CORE DASHBOARD */}
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dashboard/calculations" element={<HistoryPage />} />
				<Route path="/dashboard/profile" element={<ProfilePage />} />

				{/* ================= TAX DASHBOARD ROUTES */}
				<Route
					path={TAX_ROUTES.freelancer.dashboard}
					element={<Freelancer />}
				/>
				<Route path={TAX_ROUTES.payePit.dashboard} element={<PayePit />} />
				<Route path={TAX_ROUTES.cit.dashboard} element={<CIT />} />
				<Route path={TAX_ROUTES.vat.dashboard} element={<VAT />} />
			</Route>
		</Routes>
	);
}
