// ===================================== USER TRANSFORMATION
// UTILS
// =====================================
import type { User } from "../../../api/types/user.type";
import type { UserModel } from "../dashComponents/dashTypes/user.model";
import { formatDate } from "./dateFormatter";

// =====================================
export function transformUser(user?: User): UserModel | null {
	if (!user) return null;

	return {
		id: user._id,
		name: user.name,
		email: user.email,
		image: user.image ?? null,
		role: user.role ?? "USER",
		createdAt: user.createdAt ?? "",
		createdAtFormatted: formatDate(user.createdAt, "absolute"),
	};
}
