// =====================================
// src/context/UserContext.ts
// =====================================
import { createContext } from "react";
import type { UserModel } from "../components/dashboard/dashComponents/dashTypes/user.model";
import type { UpdateUserPayload } from "../api/user.api";

// =====================================
export type UserContextType = {
	user: UserModel | null;
	loading: boolean;
	updateUser: (data: UpdateUserPayload) => Promise<void>;
};

// =====================================
const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
