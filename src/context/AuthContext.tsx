// =====================================
// src/components/context/AuthContext.tsx
// ===================================== AUTH CONTEXT COMPONENT
import { createContext } from "react";

// =====================================
export type User = {
	id: string;
	name: string;
	email: string;
	role: "USER" | "ADMIN";
	image?: string;
	memberSince?: string;
};

// =====================================
export type AuthContextType = {
	user: User | null;
	token: string | null;
	loading: boolean;
	login: (token: string, user: User) => void;
	logout: () => void;
	setUser: (user: User) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
