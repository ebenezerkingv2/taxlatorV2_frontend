// =====================================
// src/components/dashboard/dashComponents/Topbar.tsx
// ===================================== DASHBOARD TOPBAR COMPONENT
import TimeDate from "../../reusables/TimeDate";
import { useUser } from "../../../context/useUser";
import OptimizedImage from "../../reusables/OptimizedImage";
import { safeImage } from "../../dashboard/dashUtils/safeImage";

// =====================================
export default function Topbar() {
	const { user } = useUser();

	const fallbackImage = "tzngs8muzgqookwb09ia";

	const imagePublicId = safeImage(user?.image) ?? fallbackImage;

	return (
		<header className="topbar_parent fixed top-0 left-0 right-0 h-[80px] z-30 bg-black border-b-8 border-[#f4ab17]/20 flex items-center justify-end md:justify-between pl-20 pr-4">
			{/* ========================== TIME AND DATE */}
			<TimeDate className="hidden md:block text-sm text-[#f4ab17]" />

			{/* ========================== USER */}
			<div className="topBar_userProfile flex items-center gap-2">
				<h1 className="relative text-sm text-[#f4ab17] font-bold px-2">
					{user?.name || "Guest"}

					<span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-[120%] bg-[#01bdfc] shadow-[0_0_12px_#01bdfc] rounded-full" />
				</h1>

				<OptimizedImage
					publicId={imagePublicId}
					alt="Profile"
					width={80}
					height={80}
					crop="fill"
					className="w-12 h-12 md:w-14 md:h-14 object-cover border-2 border-[#01bdfc] rounded-full"
				/>
			</div>
		</header>
	);
}
