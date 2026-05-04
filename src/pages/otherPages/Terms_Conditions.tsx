// =====================================
// src/pages/otherPages/Terms_Conditions.tsx
// ===================================== TERMS_CONDITIONS COMPONENT

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
			/>
			<path d="M12 6.6v13.6" stroke="currentColor" strokeWidth="1.7" />
		</svg>
	);
}

// ===================================== FUNCTION
export default function Terms() {
	const navigate = useNavigate();

	return (
		<div
			id="terms_conditions"
			className="bg-black py-16 overflow-hidden w-full"
		>
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="terms_conditions-parent w-full max-w-7xl mx-auto px-4">
				{/* ================= HEADER ================= */}
				<div className="text-center mb-6">
					<div className="flex justify-center text-[#01bdfc]">
						<BookIcon className="h-9 w-9 shadow-[0_0_20px_4px_#01bdfc]" />
					</div>
					<h1 className="text-2xl font-bold text-[#f4ab17] mt-2">
						Terms & Conditions
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
							<h2 className="text-[#01bdfc] font-semibold">1. Acceptance</h2>
							<p>
								By using Taxlator, you agree to these terms. If you do not
								agree, please do not use the app.
							</p>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">2. Purpose</h2>
							<p>
								Taxlator provides estimated tax calculations based on Nigerian
								tax rules. It is not financial or legal advice.
							</p>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">
								3. User Responsibility
							</h2>
							<ul className="list-disc pl-5 mt-2">
								<li>Provide accurate inputs</li>
								<li>Use the app legally</li>
								<li>Understand results depend on your data</li>
							</ul>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">4. No Liability</h2>
							<p>
								Taxlator is not responsible for decisions, losses, or outcomes
								resulting from use of the app.
							</p>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">5. Accounts</h2>
							<p>
								If you create an account, you are responsible for your data and
								activity. Saving calculations is optional.
							</p>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">6. Availability</h2>
							<p>
								Taxlator is currently intended for Nigerian users and may not
								reflect real-time legal updates.
							</p>
						</section>

						<section>
							<h2 className="text-[#01bdfc] font-semibold">7. Updates</h2>
							<p>
								We may update these terms at any time. Continued use means you
								accept changes.
							</p>
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
