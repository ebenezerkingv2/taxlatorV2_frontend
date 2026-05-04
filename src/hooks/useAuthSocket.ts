// ===================================== USE AUTH SOCKET
// HOOKS = R
// =====================================
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../socket/socket";
import { logout } from "../utils/auth";

// =====================================
export default function useAuthSocket(userId?: string) {
	const navigate = useNavigate();
	const socket = getSocket();

	useEffect(() => {
		if (!userId) return;

		// =============================== JOIN ROOM
		socket.emit("auth:join", userId);

		// =============================== GLOBAL LOGOUT
		const handleLogout = () => {
			logout();
			navigate("/login-page");
		};

		socket.on("auth:logout", handleLogout);

		return () => {
			socket.off("auth:logout", handleLogout);
		};
	}, [userId, socket, navigate]);
}
