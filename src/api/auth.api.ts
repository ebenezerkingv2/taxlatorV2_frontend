// =====================================
// src/api/auth.api.ts
// ===================================== AUTH API
import api from "./axios";

// =============================== LOGIN
export const loginApi = async (email: string, password: string) => {
	const res = await api.post("/api/auth/login", {
		email,
		password,
	});

	return res.data;
};

// =============================== REGISTER
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

	return res.data;
};

// =============================== FORGOT PASSWORD
export const forgotPasswordApi = async (email: string) => {
	const res = await api.post("/api/auth/forgot-password", {
		email,
	});

	return res.data;
};

// =============================== RESET PASSWORD
export const resetPasswordApi = async (token: string, newPassword: string) => {
	const res = await api.post("/api/auth/reset-password", {
		token,
		newPassword,
	});

	return res.data;
};


