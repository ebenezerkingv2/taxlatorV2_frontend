// =====================================
// src/components/sections/HeroSection.tsx
// ===================================== HERO SECTION COMPONENT
import taxlatorBanner from "../../assets/images/taxlator-banner.webp";
import TaxOptionsButton from "../ui/buttons/TaxOptionsButton";
import HeroFrame from "../ui/frames/HeroFrame";

import { useUser } from "../../context/useUser";

// ===================================== FUNCTION
export default function HeroSection() {
	const { user } = useUser();

	const isAuthenticated = Boolean(user?.id);

	return (
		<HeroFrame id="heroSection">
			<img
				src={taxlatorBanner}
				alt="Taxlator"
				className="w-full h-auto object-cover lg:object-contain"
			/>

			{/* ================= TAX OPTIONS BUTTON (PUBLIC ONLY) ================= */}
			{!isAuthenticated && (
				<div className="flex justify-center py-[2rem] bg-gradient-to-b from-black via-[#000aff] to-black">
					<TaxOptionsButton className="px-[2rem] py-[0.5rem] text-[1.2rem] md:text-[2rem]">
						Tax Options
					</TaxOptionsButton>
				</div>
			)}
		</HeroFrame>
	);
}
