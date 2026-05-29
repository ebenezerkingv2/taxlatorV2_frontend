// ===============================
// src/socket/socket.ts
// =============================== SOCKET.IO CLIENT
import { io, Socket } from "socket.io-client";

// ===============================
let socket: Socket | null = null;

// ===============================
export const getSocket = () => {
	if (!socket) {
		socket = io(import.meta.env.VITE_API_URL, {
			autoConnect: false,

			transports: ["polling", "websocket"],

			withCredentials: true,
		});
	}

	return socket;
};
