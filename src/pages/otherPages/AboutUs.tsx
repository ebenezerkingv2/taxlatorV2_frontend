// =====================================
// src/pages/otherPages/AboutUs.tsx
// ===================================== ABOUT US COMPONENT

import { useNavigate } from "react-router-dom";
import GeneralButton from "../../components/ui/buttons/GeneralButton";
import LegalAuthFrame from "../../components/ui/frames/LegalAuthFrame";

// ================= ICONS (MODERN REACT ICONS)
import { FaUsers } from "react-icons/fa";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi2";

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

// ================= SECTION CARD
function SectionCard({
	title,
	icon,
	children,
}: {
	title: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className="relative rounded-2xl bg-gradient-to-b from-black via-[#000aff] to-black py-6 px-4">
			<div className="flex items-start gap-3">
				<div className="text-[#01bdfc] border border-[#01bdfc] shadow-[0_0_20px_4px_#01bdfc] mt-1">
					{icon}
				</div>

				<div>
					<h2 className="text-[#01bdfc] font-semibold text-sm">{title}</h2>
					<div className="mt-2 text-sm text-[#dbcfff]/90 leading-relaxed">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}

// ================= PAGE
export default function AboutUs() {
	const navigate = useNavigate();

	return (
		<div id="aboutUs" className="bg-black py-16 overflow-hidden w-full">
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="aboutUs-parent w-full max-w-7xl mx-auto px-4">
				{/* ================= HEADER ================= */}
				<div className="text-center mb-6">
					<div className="flex justify-center text-[#01bdfc]">
						<BookIcon className="h-9 w-9 shadow-[0_0_20px_4px_#01bdfc]" />
					</div>

					<h1 className="text-2xl font-bold text-[#f4ab17] mt-2">
						About Taxlator
					</h1>

					<p className="text-xs text-[#dbcfff]/90 mt-1">
						Simple, fast and accurate Nigerian tax calculations
					</p>
				</div>

				{/* ================= FRAME + CARD ================= */}
				<LegalAuthFrame className="w-full max-w-2xl mx-auto rounded-2xl bg-gradient-to-b from-black via-[#000aff] to-black p-6">
					{/* ================= CONTENT ================= */}
					<div className="space-y-5 text-sm text-[#dbcfff]/90 leading-relaxed">
						<SectionCard title="Our Mission" icon={<FaUsers size={25} />}>
							Taxlator was built to simplify tax calculations for Nigerians. We
							make it easy to understand PAYE, VAT, CIT and freelance taxes
							using real Nigerian tax rules — completely free.
						</SectionCard>

						<SectionCard
							title="What We Do"
							icon={<HiOutlineBriefcase size={25} />}
						>
							We calculate Nigerian taxes including:
							<ul className="list-disc pl-5 mt-2 space-y-1">
								<li>PAYE (Pay As You Earn)</li>
								<li>VAT (Value Added Tax)</li>
								<li>Company Income Tax (CIT)</li>
								<li>Freelancer / Self-employed tax</li>
							</ul>
							All calculations are based on current Nigerian tax laws and
							structured for clarity.
						</SectionCard>

						<SectionCard
							title="Important Disclaimer"
							icon={<HiOutlineInformationCircle size={25} />}
						>
							Taxlator is for informational purposes only. While we follow
							Nigerian tax regulations, tax laws can change and individual
							situations differ. Always consult a qualified tax professional or
							FIRS for official advice.
						</SectionCard>

						<SectionCard
							title="Why Taxlator Exists"
							icon={<HiOutlineChartBar size={25} />}
						>
							Most tax tools are either expensive or too complex. Taxlator
							exists to give everyday Nigerians a free, simple, and reliable way
							to estimate their taxes without confusion.
						</SectionCard>
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
