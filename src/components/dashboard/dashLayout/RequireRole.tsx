// =====================================
// src/dashboard/dashLayout/RequireRole.tsx
// ===================================== ROLE BASED
import { useUser } from "../../../context/useUser";
import { Navigate } from "react-router-dom";

// =====================================
type Props = {
	allowed: ("USER" | "ADMIN")[];
	children: React.ReactNode;
};

// =====================================
export default function RequireRole({ allowed, children }: Props) {
	const { user } = useUser();

	if (!user) return <Navigate to="/login-page" replace />;

	if (!allowed.includes(user.role)) {
		return <Navigate to="/dashboard" replace />;
	}

	return <>{children}</>;
}
