// ===============================
// src/routes/AdminGuardRoute.tsx
// =============================== ADMIN GUARD ROUTES COMPONENT
import { Navigate } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";

// ===============================
type AdminRouteProps = {
	children: React.ReactNode;
};

// ===============================
export default function AdminRoute({ children }: AdminRouteProps) {
	const token = getToken();
	const user = getUser();

	if (!token) {
		return <Navigate to="/login-page" replace />;
	}

	if (user?.role !== "ADMIN") {
		return <Navigate to="/dashboard" replace />;
	}

	return <>{children}</>;
}