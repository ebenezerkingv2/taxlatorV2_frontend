// =====================================
// src/components/dashboard/dashProfileModal/ChangePasswordModal.tsx
// =====================================
import { useState } from "react";
import api from "../../../api/axios";
import ModalFrame from "../dashModal/ModalFrame";
import {
	modalInputStyles,
	modalButtonGroupStyles,
	modalErrorStyles,
} from "../dashModal/modalStyles";
import GeneralButton from "../../ui/buttons/GeneralButton";

// =====================================
type ChangePasswordModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

// =====================================
export default function ChangePasswordModal({
	isOpen,
	onClose,
}: ChangePasswordModalProps) {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	if (!isOpen) return null;

	// =====================================
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!currentPassword || !newPassword) {
			setError("All fields are required");
			return;
		}

		try {
			setLoading(true);
			setError("");

			await api.patch("/api/user/password", {
				currentPassword,
				newPassword,
			});

			onClose();
		} catch (err) {
			console.error(err);
			setError("Failed to change password");
		} finally {
			setLoading(false);
		}
	};

	// =====================================
	return (
		<ModalFrame title="Change Password">
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
					placeholder="Current password"
					className={modalInputStyles}
				/>

				<input
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					placeholder="New password"
					className={modalInputStyles}
				/>

				{error && <p className={modalErrorStyles}>{error}</p>}

				{/* ========================= BUTTONS CANCEL */}
				<div className={modalButtonGroupStyles}>
					<GeneralButton
						type="button"
						onClick={onClose}
						className="w-28 h-12 text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
					>
						Cancel
					</GeneralButton>

					{/* ========================= BUTTONS SAVE */}
					<GeneralButton
						type="submit"
						className="w-28 h-12 text-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
					>
						{loading ? "Saving..." : "Save"}
					</GeneralButton>
				</div>
			</form>
		</ModalFrame>
	);
}
