// ===================================== USER API
// src/api/user.api.ts
// =====================================
import api from "./axios";

// =====================================
export type UpdateUserPayload = {
	name?: string;
	email?: string;
	image?: string;
};

// ===================================== CHECK EMAIL
export const checkEmailApi = async (email: string) => {
	const res = await api.get("/api/auth/check-email", {
		params: { email },
	});

	return res.data.data;
};

// ===================================== GET CURRENT USER
export const getMeApi = async () => {
	const res = await api.get("/api/user/me");

	return res.data.data;
};

// ===================================== UPDATE PROFILE
export const updateUserApi = async (data: UpdateUserPayload) => {
	const res = await api.patch("/api/user/profile", data);

	return res.data.data;
};
