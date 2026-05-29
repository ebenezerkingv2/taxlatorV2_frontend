// =====================================
// src/hooks/useAuthSocket.ts
// ===================================== USE AUTH SOCKET
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getSocket } from "../socket/socket";
import { logout } from "../utils/auth";

// =====================================
export default function useAuthSocket(userId?: string) {
	const navigate = useNavigate();

	useEffect(() => {
		if (!userId) return;

		const socket = getSocket();

		// ================= CONNECT
		if (!socket.connected) {
			socket.connect();
		}

		// ================= JOIN USER ROOM
		socket.emit("auth:join", userId);

		// ================= GLOBAL LOGOUT
		const handleLogout = () => {
			logout();

			socket.disconnect();

			navigate("/login-page");
		};

		// ================= EVENTS
		socket.on("auth:logout", handleLogout);

		socket.on("connect", () => {
			console.log("🟢 Socket connected:", socket.id);
		});

		socket.on("disconnect", (reason) => {
			console.log("🔴 Socket disconnected:", reason);
		});

		return () => {
			socket.off("auth:logout", handleLogout);
		};
	}, [userId, navigate]);
}
