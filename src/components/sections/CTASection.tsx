// =====================================
// src/pages/components/sections/CTASection.tsx
// ===================================== CALL TO ACTION COMPONENT
import GeneralButton from "../../components/ui/buttons/GeneralButton";

import CardFrame from "../ui/frames/CardFrame";
import SectionFrame from "../ui/frames/SectionFrame";

import { useUser } from "../../context/useUser";

// ===================================== FUNCTION
export default function CTASection() {
	const { user } = useUser();

	const isAuthenticated = Boolean(user?.id);

	// ================= HIDE CTA FOR AUTH USERS
	if (isAuthenticated) {
		return null;
	}

	return (
		<SectionFrame id="ctaSection">
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="text-center">
				<CardFrame className="text-center px-6 py-16">
					<h2 className="text-2xl md:text-3xl font-bold text-[#f4ab17]">
						Ready to Get Started?
					</h2>

					<p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-[#dbcfff]/90 leading-relaxed">
						Start calculating your taxes instantly. No signup required. Save
						your results anytime by creating a free account.
					</p>

					{/* ================= BUTTON ================= */}
					<GeneralButton to="/signUp-page" className="mt-10">
						Sign Up Now
					</GeneralButton>
				</CardFrame>
			</div>
		</SectionFrame>
	);
}
