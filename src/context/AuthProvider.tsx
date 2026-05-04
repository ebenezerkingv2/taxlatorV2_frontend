// =====================================
// src/components/context/AuthProvider.tsx
// ===================================== AUTH PROVIDER
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import { setAuth, getToken, getUser, logout as clearAuth } from "../utils/auth";

// =====================================
export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUserState] = useState<User | null>(getUser());
	const [token, setToken] = useState<string | null>(getToken());

	// =====================================
	const [loading] = useState(false);

	// =====================================
	const login = (token: string, user: User) => {
		setAuth(token, user);

		setToken(token);
		setUserState(user);

		window.dispatchEvent(new Event("auth:login"));
	};

	// =====================================
	const logout = () => {
		clearAuth();

		setToken(null);
		setUserState(null);
	};

	const setUser = (user: User) => {
		localStorage.setItem("user", JSON.stringify(user));
		setUserState(user);
	};

	return (
		<AuthContext.Provider
			value={{ user, token, loading, login, logout, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
}
