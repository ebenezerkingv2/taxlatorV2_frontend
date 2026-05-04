// =====================================
// src/components/dashboard/dashProfileModal/ChangeNameModal.tsx
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
type ChangeNameModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

// =====================================
export default function ChangeNameModal({
	isOpen,
	onClose,
}: ChangeNameModalProps) {
	const { user, updateUser } = useUser();

	const [name, setName] = useState(user?.name || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	if (!isOpen) return null;

	// =====================================
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim()) {
			setError("Name is required");
			return;
		}

		try {
			setLoading(true);
			setError("");

			const updatedUser = await updateUserApi({
				name,
			});

			await updateUser(updatedUser);

			onClose();
		} catch (err) {
			console.error(err);
			setError("Failed to update name");
		} finally {
			setLoading(false);
		}
	};

	// =====================================
	return (
		<ModalFrame title="Change Name">
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter new name"
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
