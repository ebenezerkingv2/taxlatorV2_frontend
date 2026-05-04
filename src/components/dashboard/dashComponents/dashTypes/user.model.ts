// ===================================== USER UI MODEL
// TYPES = R

// =====================================
export type UserModel = {
	id: string;
	name: string;
	email: string;
	image: string | null;
	role: "USER" | "ADMIN";
	createdAt: string;
	createdAtFormatted: string;
};