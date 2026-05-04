// =====================================
// src/components/layout/footer/Footer.tsx
// ===================================== FOOTER COMPONENT

import { motion } from "framer-motion";
import FooterLink from "../ui/links/FooterLinkStyle";
import ExternalLink from "../ui/links/ExternalLinkStyle";
import { footerLinks, socialLinks } from "../../config/footerData";
import GeneralButton from "@components/ui/buttons/GeneralButton";

// ==================================== FUNCTION
function Footer() {
	const date = new Date().getFullYear();

	return (
		<section className="relative bg-gradient-to-b from-black via-[#000aff] to-black">
			<motion.footer className="footer__parent">
				<div className="relative max-w-7xl mx-auto px-4 pb-[4rem] pt-[8rem]">
					<div className="flex flex-col gap-10 md:flex-row md:justify-between">
						{/* ================= LEFT */}
						<div>
							<img
								src="/taxlator.webp"
								alt="Taxlator footer"
								className="w-[13rem] h-auto block"
							/>

							<p className="mt-2 text-sm text-[#dbcfff]/90 max-w-sm">
								Simplifying tax calculations for everyone. Fast and Accurate.
							</p>
						</div>

						{/* ================= MIDDLE (LINKS) */}
						<div className="flex flex-col gap-3 text-sm font-semibold">
							{footerLinks.map((group) => (
								<div key={group.title} className="flex flex-col gap-2">
									<p className="text-[#f4ab17]">{group.title}</p>

									{group.links.map((link) => (
										<FooterLink key={link.to} to={link.to}>
											{link.label}
										</FooterLink>
									))}
								</div>
							))}
						</div>

						{/* ================= RIGHT (SOCIALS) */}
						<div className="flex flex-col gap-4">
							<p className="text-sm font-semibold text-[#f4ab17]">Connect</p>

							<div className="flex items-center gap-4">
								{socialLinks.map((social, i) => {
									const Icon = social.icon;

									return (
										<ExternalLink
											key={i}
											href={social.href}
											className="p-3 rounded-xl bg-black/40 text-[#f4ab17] hover:bg-[#01bdfc] hover:text-black transition-all duration-400"
										>
											<Icon size={18} />
										</ExternalLink>
									);
								})}
							</div>
							<GeneralButton
								type="button"
								onClick={() =>
									window.open(
										"https://docs.google.com/document/d/1rMZx8aLk1ZitCwSRTK706o19mj5UgyeQGABCZt6eAJg/edit?usp=sharing",
										"_blank",
										"noopener,noreferrer",
									)
								}
							>
								Dev Resume
							</GeneralButton>
						</div>
					</div>
					<div className="designed_by mt-6 text-xs text-[#f4ab17]">
						<p>© {date}. designed & built by Ebenezer King</p>
					</div>
				</div>
			</motion.footer>
		</section>
	);
}

export default Footer;
