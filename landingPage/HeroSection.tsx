// =====================================
// src/pages/landingPage/HeroSection.tsx
// ===================================== HERO SECTION COMPONENT

import { motion } from "framer-motion";
import taxlatorBanner from "../../assets/images/taxlator_hom";

// ===================================== FUNCTION
export default function HeroSection() {
	return (
		<div className="max-w-6xl mx-auto px-4 py-10 mt-10 lg:mt-0">
			{/* Image */}
			<motion.div
				className="relative overflow-hidden border border-slate-200 aspect-[16/7]"
				initial={{ scale: 1.1, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<img
					src={taxlatorBanner}
					alt="Taxlator"
					className="absolute inset-0 w-full h-full object-cover object-bottom"
				/>
			</motion.div>
		</div>
	);
}
// ----------------------------------------------
// ----------------------------------------------
