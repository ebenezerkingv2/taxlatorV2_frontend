// =====================================
// src/context/UserProvider.tsx
// =====================================
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

import UserContext from "./UserContext";
import { getToken } from "../utils/auth";
import { getMeApi, updateUserApi } from "../api/user.api";
import { transformUser } from "../components/dashboard/dashUtils/transformUser";
import type { UserModel } from "../components/dashboard/dashComponents/dashTypes/user.model";
import type { UpdateUserPayload } from "../api/user.api";

// =====================================
export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUserState] = useState<UserModel | null>(null);
	const [loading, setLoading] = useState(true);

	// ===================================== LOAD USER ON MOUNT
	useEffect(() => {
		const loadUser = async () => {
			try {
				const token = getToken();

				if (!token) {
					setUserState(null);
					setLoading(false);
					return;
				}

				const data = await getMeApi();

				if (!data) {
					setUserState(null);
					setLoading(false);
					return;
				}

				setUserState(transformUser(data));
			} catch (err) {
				console.error("Failed to load user:", err);
				setUserState(null);
			} finally {
				setLoading(false);
			}
		};

		loadUser();
	}, []);

	// =====================================
	const refreshUser = async () => {
		try {
			const token = getToken();
			if (!token) return;

			const data = await getMeApi();
			if (!data) return;

			setUserState(transformUser(data));
		} catch (err) {
			console.error("Failed to refresh user:", err);
		}
	};

	// =====================================
	useEffect(() => {
		const syncUser = () => {
			refreshUser();
		};

		window.addEventListener("auth:login", syncUser);

		return () => {
			window.removeEventListener("auth:login", syncUser);
		};
	}, []);

	// ===================================== UPDATE USER
	const updateUser = async (data: UpdateUserPayload) => {
		try {
			const user = await updateUserApi(data);

			if (!user) return;

			setUserState(transformUser(user));
		} catch (err) {
			console.error("Failed to update user:", err);
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				loading,
				updateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
