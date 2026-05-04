// =====================================
// src/pages/landingPage/LandingPage.tsx
// ===================================== LANDING PAGE COMPONENT
import HeroSection from "../../components/sections/HeroSection";
import HowItWorksSection from "../../components/sections/HowItWorksSection";
import TipsUpdatesSection from "../../components/sections/TipsUpdatesSection";
import AboutAppSection from "../../components/sections/AboutAppSection";
import CTASection from "../../components/sections/CTASection";

// ==================================== FUNCTION
export default function LandingPageLayout() {
	return (
		<div className="landingPageLayout w-full max-w-7xl mx-auto flex flex-col px-4">
			<HeroSection />
			<HowItWorksSection />
			<TipsUpdatesSection />
			<AboutAppSection />
			<CTASection />
		</div>
	);
}
