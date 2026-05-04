// ===================================== AUTO LOGIN
// src/api/hooks/useAuthInit.ts
// =====================================
import { useEffect } from "react";
import type { NavigateFunction } from "react-router-dom";
import { getMeApi } from "../api/user.api";
import { useAuthContext } from "../hooks/useAuthContext";

export const useAuthInit = (navigate: NavigateFunction) => {
	const { setUser, logout } = useAuthContext();

	useEffect(() => {
		const init = async () => {
			const token = localStorage.getItem("token");

			if (!token) {
				navigate("/login-page", { replace: true });
				return;
			}

			try {
				const res = await getMeApi();

				setUser(res.user);
			} catch {
				logout();
				navigate("/login-page", { replace: true });
			}
		};

		init();
	}, [navigate, setUser, logout]);
};
