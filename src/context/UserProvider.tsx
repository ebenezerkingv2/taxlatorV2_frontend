// ===================================== USER PROVIDER
// src/context/UserProvider.tsx
// =====================================
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import UserContext from "./UserContext";
import { getToken, setAuth, logout as clearAuth } from "../utils/auth";
import {
	getMeApi,
	updateUserApi,
	type UpdateUserPayload,
} from "../api/user.api";
import { transformUser } from "../components/dashboard/dashUtils/transformUser";
import type { UserModel } from "../components/dashboard/dashComponents/dashTypes/user.model";

// =====================================
export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUserState] = useState<UserModel | null>(null);
	const [loading, setLoading] = useState(true);

	// ===================================== LOGIN
	const login = async (accessToken: string) => {
		try {
			setLoading(true);

			setAuth(accessToken);

			await refreshUser();
		} catch (err) {
			console.error("Login failed:", err);
			clearAuth();
			setUserState(null);
		} finally {
			setLoading(false);
		}
	};

	// ===================================== REFRESH USER
	const refreshUser = async () => {
		try {
			const token = getToken();

			if (!token) {
				setUserState(null);
				return;
			}

			const data = await getMeApi();

			if (!data) {
				setUserState(null);
				return;
			}

			setUserState(transformUser(data));
		} catch (err) {
			console.error("Failed to refresh user:", err);
			clearAuth();
			setUserState(null);
		}
	};

	// ===================================== INIT
	useEffect(() => {
		const init = async () => {
			try {
				setLoading(true);
				await refreshUser();
			} finally {
				setLoading(false);
			}
		};

		init();
	}, []);

	// ===================================== UPDATE USER
	const updateUser = async (data: UpdateUserPayload) => {
		try {
			const updated = await updateUserApi(data);

			if (!updated) return;

			setUserState(transformUser(updated));
		} catch (err) {
			console.error("Update failed:", err);
		}
	};

	// ===================================== LOGOUT
	const logout = () => {
		clearAuth();
		setUserState(null);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				loading,
				login,
				logout,
				updateUser,
				refreshUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
