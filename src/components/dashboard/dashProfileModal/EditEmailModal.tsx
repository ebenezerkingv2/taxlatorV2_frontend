// =====================================
// src/components/dashboard/dashProfileModal/ChangeEmailModal.tsx
// =====================================
import { useState } from "react";
import { useUser } from "../../../context/useUser";
import { updateUserApi } from "../../../api/user.api";
import ModalFrame from "../dashModal/ModalFrame";
import {
	modalInputStyles,
	modalButtonGroupStyles,
	modalErrorStyles,
} from "../dashModal/modalStyles";
import GeneralButton from "../../ui/buttons/GeneralButton";

// =====================================
type ChangeEmailModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

// =====================================
export default function ChangeEmailModal({
	isOpen,
	onClose,
}: ChangeEmailModalProps) {
	const { user, updateUser } = useUser();

	const [email, setEmail] = useState(user?.email || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	if (!isOpen) return null;

	// =====================================
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim()) {
			setError("Email is required");
			return;
		}

		try {
			setLoading(true);
			setError("");

			const updatedUser = await updateUserApi({
				email,
			});

			await updateUser(updatedUser);

			onClose();
		} catch (err) {
			console.error(err);
			setError("Failed to update email");
		} finally {
			setLoading(false);
		}
	};

	// =====================================
	return (
		<ModalFrame title="Change Email">
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter new email"
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
