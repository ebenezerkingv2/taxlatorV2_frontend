// ===================================== AUTH UTILS (COOKIE-BASED REFRESH)
// src/utils/auth.ts
// =====================================
export type User = {
	id: string;
	name: string;
	email: string;
	role: "USER" | "ADMIN";
	image?: string;
};

// ===================================== ACCESS TOKEN ONLY
const ACCESS_TOKEN_KEY = "token";

// ===================================== STORE ACCESS TOKEN ONLY
export const setAuth = (accessToken: string) => {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

// ===================================== GET ACCESS TOKEN
export const getToken = () => {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// ===================================== LOGOUT
export const logout = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
};
