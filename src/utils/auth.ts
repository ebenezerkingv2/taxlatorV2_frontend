// ===================================== AUTH UTILS 
// src/utils/auth.ts
// =====================================
export type User = {
	id: string;
	name: string;
	email: string;
	role: "USER" | "ADMIN";
	image?: string;
};

// =====================================
const ACCESS_TOKEN_KEY = "token";
const USER_KEY = "user";

// ===================================== STORE AUTH
export const setAuth = (accessToken: string, user: User) => {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// =====================================
export const getToken = () => {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// =====================================
export const getUser = (): User | null => {
	const data = localStorage.getItem(USER_KEY);
	return data ? JSON.parse(data) : null;
};

// =====================================
export const logout = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
};
