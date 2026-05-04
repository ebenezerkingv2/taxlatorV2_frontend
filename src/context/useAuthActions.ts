// ===================================== USE AUTH ACTIONS
// src/context/useAuthActions.ts
// =====================================
import { useState } from "react";
import {
	loginService,
	registerService,
	logoutService,
} from "../api/services/auth.service";
import { useAuthContext } from "../hooks/useAuthContext";

// =====================================
export function useAuthActions() {
	const { login: setAuthLogin, logout: setAuthLogout } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const login = async (email: string, password: string) => {
		setLoading(true);
		try {
			const res = await loginService(email, password);

			setAuthLogin(res.token, res.user);

			return res;
		} finally {
			setLoading(false);
		}
	};

	const register = async (name: string, email: string, password: string) => {
		setLoading(true);
		try {
			const res = await registerService(name, email, password);

			setAuthLogin(res.token, res.user);

			return res;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		logoutService();
		setAuthLogout();
	};

	return {
		login,
		register,
		logout,
		loading,
	};
}
