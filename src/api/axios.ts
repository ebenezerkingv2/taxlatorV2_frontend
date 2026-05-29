// ===================================== AXIOS INSTANCE (COOKIE REFRESH FIXED)
// src/api/axios.ts
// =====================================
import axios from "axios";
import { getToken, setAuth, logout } from "../utils/auth";

// =====================================
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

// ===================================== REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
	const token = getToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

// ===================================== RESPONSE INTERCEPTOR
api.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config;

		const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!isRefreshCall
		) {
			originalRequest._retry = true;

			try {
				// ===================================== REFRESH TOKEN COOKIE
				const res = await api.post("/api/auth/refresh");

				const { accessToken } = res.data.data;

				setAuth(accessToken);

				originalRequest.headers.Authorization = `Bearer ${accessToken}`;

				return api(originalRequest);
			} catch {
				logout();
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	},
);

export default api;
