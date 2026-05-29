// ===================================== AXIOS INSTANCE (COOKIE REFRESH)
// src/api/axios.ts
// =====================================
import axios from "axios";
import { getToken, setAuth, logout } from "../utils/auth";

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

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// ================= COOKIE AUTO-SENT
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
