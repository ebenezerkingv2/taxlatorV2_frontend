// ===================================== USER TYPE
// src/api/types/user.types.ts
// =====================================
export type User = {
	_id: string;
	name: string;
	email: string;
	image?: string;
	role?: "USER" | "ADMIN";

	createdAt?: string;
	updatedAt?: string;
};
