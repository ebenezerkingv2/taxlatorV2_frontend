// =====================================
// src/components/dashboard/dashComponents/Topbar.tsx
// ===================================== DASHBOARD TOPBAR COMPONENT
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TimeDate from "../../reusables/TimeDate";
import { useUser } from "../../../context/useUser";
import OptimizedImage from "../../reusables/OptimizedImage";
import { safeImage } from "../../dashboard/dashUtils/safeImage";
import { getCloudinaryUrl } from "../../dashboard/dashUtils/cloudinary";

// =====================================
export default function Topbar() {
	const { user } = useUser();
	const [openImage, setOpenImage] = useState(false);

	const fallbackImage = "tzngs8muzgqookwb09ia";
	const imagePublicId = safeImage(user?.image) || fallbackImage;

	const fullImageUrl = getCloudinaryUrl(imagePublicId, {
		width: 900,
		crop: "fit",
	});

	// =====================================
	// ESC KEY CLOSE MODAL
	// =====================================
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpenImage(false);
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<>
			{/* ===================================== TOPBAR */}
			<header className="topbar_parent fixed top-0 left-0 right-0 h-[80px] z-30 bg-black border-b-8 border-[#f4ab17]/20 flex items-center justify-end md:justify-between pl-20 pr-4">
				<TimeDate className="hidden md:block text-sm text-[#f4ab17]" />

				{/* ================= USER */}
				<div className="topBar_userProfile flex items-center gap-2">
					<h1 className="relative text-sm text-[#f4ab17] font-bold px-2">
						{user?.name || "Guest"}

						<span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-[120%] bg-[#01bdfc] shadow-[0_0_12px_#01bdfc] rounded-full" />
					</h1>

					{/* ================= AVATAR */}
					<div onClick={() => setOpenImage(true)} className="cursor-pointer">
						<OptimizedImage
							publicId={imagePublicId}
							alt="Profile"
							width={80}
							height={80}
							crop="fill"
							className="w-12 h-12 md:w-14 md:h-14 object-cover border-2 border-[#01bdfc] rounded-full hover:scale-105 transition"
						/>
					</div>
				</div>
			</header>

			{/* ===================================== MODAL */}
			<AnimatePresence>
				{openImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setOpenImage(false)}
						className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer
						backdrop-blur-xl bg-black/60"
					>
						{/* ================= IMAGE ZOOM */}
						<motion.img
							src={fullImageUrl}
							alt="Profile Full View"
							initial={{ scale: 0.6, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.6, opacity: 0 }}
							transition={{ type: "spring", stiffness: 180, damping: 18 }}
							className="max-w-[90%] max-h-[90%] rounded-xl border border-[#01bdfc] shadow-[0_0_40px_#01bdfc] cursor-default"
							onClick={(e) => e.stopPropagation()}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
