// =====================================
// src/components/dashboard/dashPages/Profile.tsx
// ===================================== PROFILE PAGE
import { useState } from "react";

import DashboardPageFrame from "../dashComponents/frames/DashBoardPageFrame";
import CardFrame from "../../ui/frames/CardFrame";
import ProfileImageUploader from "../dashComponents/ProfileImageUploader";

import { useUser } from "../../../context/useUser";
import { formatDate } from "../dashUtils/dateFormatter";
import ChangeNameModal from "../dashProfileModal/EditNameModal";
import ChangeEmailModal from "../dashProfileModal/EditEmailModal";
import ChangePasswordModal from "../dashProfileModal/ChangePasswordModal";

// ===================================== REUSABLE STYLES
const profileLabelStyles = "text-[#f4ab17] text-sm";

const profileValueStyles = "text-xs md:text-sm font-bold";

const profileActionButtonStyles =
	"text-xs md:text-sm font-bold text-[#01bdfc] hover:underline cursor-pointer self-end";

// =====================================
export default function Profile() {
	const { user, loading } = useUser();

	// ===================================== STATE
	const [showNameModal, setShowNameModal] = useState(false);

	const [showEmailModal, setShowEmailModal] = useState(false);

	const [showPasswordModal, setShowPasswordModal] = useState(false);

	// ===================================== LOADING STATE
	if (loading) {
		return (
			<DashboardPageFrame className="space-y-6 text-[#dbcfff]">
				<p className="text-sm text-white/60">Loading Profile...</p>
			</DashboardPageFrame>
		);
	}

	// ===================================== NO USER
	if (!user) {
		return (
			<DashboardPageFrame className="space-y-6 text-[#dbcfff]">
				<p className="text-sm text-white/60">
					User profile could not be loaded
				</p>
			</DashboardPageFrame>
		);
	}

	// =====================================
	return (
		<>
			<DashboardPageFrame className="space-y-6 text-[#dbcfff]">
				{/* =========================== HEADER */}
				<div className="text-end md:text-start">
					<h1 className="text-xl font-bold text-[#f4ab17]">Profile</h1>

					<p className="text-sm text-[#dbcfff]/70">
						Manage your account settings
					</p>
				</div>

				{/* =========================== CARD */}
				<CardFrame className="p-4 rounded-xl">
					<div className="profile_edit-parent space-y-4 md:max-w-sm mx-auto">
						<ProfileImageUploader className="mx-auto" />

						{/* =========================== NAME */}
						<div className="flex justify-between items-center">
							<div>
								<p className={profileLabelStyles}>Name</p>

								<p className={profileValueStyles}>{user.name}</p>
							</div>

							<button
								type="button"
								onClick={() => setShowNameModal(true)}
								className={profileActionButtonStyles}
							>
								Edit
							</button>
						</div>

						{/* =========================== EMAIL */}
						<div className="flex justify-between items-center">
							<div>
								<p className={profileLabelStyles}>Email</p>

								<p className={profileValueStyles}>{user.email}</p>
							</div>

							<button
								type="button"
								onClick={() => setShowEmailModal(true)}
								className={profileActionButtonStyles}
							>
								Edit
							</button>
						</div>

						{/* =========================== PASSWORD */}
						<div className="flex justify-between items-center">
							<div>
								<p className={profileLabelStyles}>Password</p>

								<p className={profileValueStyles}>••••••••</p>
							</div>

							<button
								type="button"
								onClick={() => setShowPasswordModal(true)}
								className={profileActionButtonStyles}
							>
								Change
							</button>
						</div>

						{/* =========================== MEMBER SINCE */}
						<div>
							<p className={profileLabelStyles}>Member since</p>

							<p className={profileValueStyles}>
								{formatDate(user.createdAt, "absolute")}
							</p>
						</div>
					</div>
				</CardFrame>
			</DashboardPageFrame>

			{/* =========================== MODALS */}

			<ChangeNameModal
				isOpen={showNameModal}
				onClose={() => setShowNameModal(false)}
			/>

			<ChangeEmailModal
				isOpen={showEmailModal}
				onClose={() => setShowEmailModal(false)}
			/>

			<ChangePasswordModal
				isOpen={showPasswordModal}
				onClose={() => setShowPasswordModal(false)}
			/>
		</>
	);
}
