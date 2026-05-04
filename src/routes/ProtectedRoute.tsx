// ===============================
// src/routes/ProtectedRoute.tsx
// =============================== PROTECTED ROUTES COMPONENT
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

// ===============================
type ProtectedRouteProps = {
	children: React.ReactNode;
};

// ===============================
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const token = getToken();

	if (!token) {
		return <Navigate to="/login-page" replace />;
	}

	return <>{children}</>;
}
