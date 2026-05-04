// =====================================
// src/utils/auth.ts
// ===================================== AUTH UTILS
export type User = {
	id: string;
	name: string;
	email: string;
	role: "USER" | "ADMIN";
};

// ===============================
export const setAuth = (token: string, user: User) => {
	localStorage.setItem("token", token);
	localStorage.setItem("user", JSON.stringify(user));
};

// ===============================
export const getToken = () => {
	return localStorage.getItem("token");
};

// ===============================
export const getUser = (): User | null => {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : null;
};

// =============================== LOGOUT
export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
};