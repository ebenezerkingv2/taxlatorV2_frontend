// =====================================
// src/context/useUser.ts
// ===================================== USE USER CONTEXT
import { useContext } from "react";
import UserContext from "./UserContext";

// ===================================== FUNCTION
export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		
		throw new Error("useUser must be used inside UserProvider");
	}
	return context;
}
