// ===================================== AUTH API (COOKIE REFRESH SYSTEM)
// src/api/auth.api.ts
// =====================================
import api from "./axios";

// ===================================== REGISTER
export const registerApi = async (
	name: string,
	email: string,
	password: string,
) => {
	const res = await api.post("/api/auth/register", {
		name,
		email,
		password,
	});

	return res.data.data;
};

// ===================================== LOGIN
export const loginApi = async (email: string, password: string) => {
	const res = await api.post("/api/auth/login", {
		email,
		password,
	});

	return res.data.data;
};

// ===================================== FORGOT PASSWORD
export const forgotPasswordApi = async (email: string) => {
	const res = await api.post("/api/auth/forgot-password", {
		email,
	});

	return res.data.data;
};

// ===================================== RESET PASSWORD
export const resetPasswordApi = async (token: string, newPassword: string) => {
	const res = await api.post("/api/auth/reset-password", {
		token,
		newPassword,
	});

	return res.data.data;
};

// =============================== REFRESH (NO BODY TOKEN)
export const refreshTokenApi = async () => {
	const res = await api.post("/api/auth/refresh");
	return res.data.data;
};
