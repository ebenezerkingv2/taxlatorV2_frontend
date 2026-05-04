// =====================================
// src/pages/otherPages/Privacy_Policy.tsx
// ===================================== PRIVACY_POLICY COMPONENT

import { useNavigate } from "react-router-dom";
import GeneralButton from "../../components/ui/buttons/GeneralButton";
import LegalAuthFrame from "../../components/ui/frames/LegalAuthFrame";

// ===================================== BOOK ICON FUNCTION
function BookIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none">
			<path
				d="M12 6.4c-2.2-1.6-5.4-1.9-8-1.4v13.9c2.6-.6 5.8-.2 8 1.4m0-13.9c2.2-1.6 5.4-1.9 8-1.4v13.9c-2.6-.6-5.8-.2-8 1.4"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinejoin="round"
			/>
			<path
				d="M12 6.6v13.6"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
		</svg>
	);
}

// ===================================== FUNCTION
export default function PrivacyPolicy() {
	const navigate = useNavigate();

	return (
		<div id="privacy_policy" className="bg-black py-16 overflow-hidden w-full">
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="privacy_policy-parent w-full max-w-7xl mx-auto px-4">
				{/* ================= HEADER ================= */}
				<div className="text-center mb-6">
					<div className="flex justify-center text-[#01bdfc]">
						<BookIcon className="h-9 w-9 shadow-[0_0_20px_4px_#01bdfc]" />
					</div>
					<h1 className="text-2xl font-bold text-[#f4ab17] mt-2">
						Privacy Policy
					</h1>
					<p className="text-xs text-[#dbcfff]/90 mt-1">
						Last updated: April 2026
					</p>
				</div>

				{/* ================= FRAME + CARD ================= */}
				<LegalAuthFrame className="w-full max-w-2xl mx-auto rounded-2xl bg-gradient-to-b from-black via-[#000aff] to-black p-6">
					{/* ================= CONTENT ================= */}
					<div className="space-y-5 text-sm text-[#dbcfff]/90 leading-relaxed">
						<section>
							<h2 className="text-[#01bdfc] font-semibold">1. Overview</h2>
							<p>
								Taxlator is a free tool built to help users in Nigeria estimate
								taxes based on current Nigerian tax laws.
							</p>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">
								2. What We Collect
							</h2>
							<p>We keep data collection minimal.</p>
							<ul className="list-disc pl-5 mt-2">
								<li>Without an account, your inputs are not stored.</li>
								<li>
									With an account, we store your email and saved calculations
									only when you choose to save them.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">
								3. How Your Data Is Used
							</h2>
							<ul className="list-disc pl-5 mt-2">
								<li>To perform tax calculations</li>
								<li>To save your results (if logged in)</li>
								<li>To improve the app experience</li>
							</ul>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">
								4. Data Protection
							</h2>
							<p>
								We apply standard security practices. Your data is never sold or
								shared with third parties.
							</p>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">5. Your Control</h2>
							<ul className="list-disc pl-5 mt-2">
								<li>You can use Taxlator without signing up</li>
								<li>Saving results is optional</li>
								<li>You can delete saved data anytime</li>
							</ul>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">6. Availability</h2>
							<p>
								Taxlator is currently designed for Nigerian users and applies
								Nigerian tax rules.
							</p>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">7. Updates</h2>
							<p>This policy may be updated as the app evolves.</p>
						</section>
					</div>
				</LegalAuthFrame>
				{/* ================= BUTTON ================= */}
				<div className="mt-8 flex justify-center">
					<GeneralButton
						onClick={() => navigate("/")}
						className="cursor-pointer mt-10"
					>
						Back to Home
					</GeneralButton>
				</div>
			</div>
		</div>
	);
}
