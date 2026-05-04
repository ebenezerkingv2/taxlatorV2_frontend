// =====================================
// src/api/services/auth.services.ts
// ===================================== AUTH  SERVICES API
import { loginApi, registerApi } from "../auth.api";
import { getMeApi } from "../user.api";

// =============================== LOGIN FLOW
export const loginService = async (email: string, password: string) => {
	const data = await loginApi(email, password);

	localStorage.setItem("token", data.token);

	const user = await getMeApi();

	return user;
};

// =============================== REGISTER FLOW
export const registerService = async (
	name: string,
	email: string,
	password: string,
) => {
	const data = await registerApi(name, email, password);

	localStorage.setItem("token", data.token);

	const user = await getMeApi();

	return user;
};

// =============================== LOGOUT
export const logoutService = () => {
	localStorage.removeItem("token");
};