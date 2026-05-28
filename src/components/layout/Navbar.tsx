// =====================================
// src/components/layout/Navbar.tsx
// ===================================== NAVBAR COMPONENT

import { useState } from "react";
import { motion } from "framer-motion";

import TimeDate from "../reusables/TimeDate";
import MobileNavbar from "../reusables/MobileNavbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import taxlatorLogo from "../../assets/logo/taxlatorLogo.webp";
import { getNavLinks } from "../../config/navLinks";
import NavLinkStyle from "../ui/links/NavLinkStyle";
import TaxOptionsButton from "../ui/buttons/TaxOptionsButton";
import { getToken } from "../../utils/auth";
import { logout } from "../../utils/auth";

// ===================================== ANIMATION CONFIG
const navbarMotion = {
	initial: { y: -150, opacity: 1 },
	animate: { y: 0, opacity: 1 },
	exit: { y: -100, opacity: 0 },
};

const navbarTransition = {
	duration: 1.5,
	easing: "ease-out",
};

// ===================================== FUNCTION
function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const token = getToken();
	const isAuthenticated = Boolean(token);

	const navLinks = getNavLinks(isAuthenticated);

	return (
		<motion.nav
			initial={navbarMotion.initial}
			animate={navbarMotion.animate}
			exit={navbarMotion.exit}
			transition={navbarTransition}
			className="navbar__parent w-full min-h-[80px] fixed top-0 left-0 z-50 flex items-center bg-gradient-to-b from-black via-[#000aff] to-black"
		>
			<div className="navbar__main w-full max-w-7xl mx-auto h-full text-[#dbcfff] flex justify-between items-end text-[0.5rem] md:text-[1rem] px-4">
				{/* ========================= LOGO */}
				<div className="logo_timeDate-parent flex items-end gap-2">
					<img
						src={taxlatorLogo}
						alt="Logo"
						className="h-[45px] md:h-[55px] lg:h-[65px] w-auto"
					/>
					<TimeDate className="text-sm" />
				</div>

				{/* ========================= LINKS */}
				<div className="navbar__menu flex items-center gap-4">
					<ul className="hidden md:flex gap-[1.5rem]">
						{navLinks.map((link, index) => (
							<li key={index}>
								{/* ========================= NORMAL LINKS */}
								{link.type === "link" && link.path && (
									<NavLinkStyle to={link.path}>{link.name}</NavLinkStyle>
								)}

								{/* ========================= TAX OPTIONS */}
								{link.type === "tax-options" && (
									<TaxOptionsButton>Tax Options</TaxOptionsButton>
								)}

								{/* ========================= LOGOUT*/}
								{link.type === "action" && (
									<button
										onClick={() => logout()}
										className="
											relative w-full block group font-bold py-2 md:py-0
											transition-colors duration-400
											bg-black/30 hover:bg-black px-2 cursor-pointer
										"
									>
										{link.name}

										{/* ========================= TOP LINE */}
										<span className="absolute left-0 top-0 h-[2px] bg-[#f4ab17] transition-all duration-400 w-0 group-hover:w-full" />

										{/* ========================= BOTTOM LINE */}
										<span className="absolute right-0 bottom-0 h-[2px] bg-[#01bdfc] transition-all duration-400 w-0 group-hover:w-full" />
									</button>
								)}
							</li>
						))}
					</ul>

					{/* ========================= HAMBURGER FOR MOBILE*/}
					<button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50">
						<motion.div
							initial={false}
							animate={{ rotate: isOpen ? 360 : 0 }}
							transition={{ duration: 0.9 }}
						>
							{isOpen ? (
								<FaTimes size={32} className="text-[#f4ab17]" />
							) : (
								<GiHamburgerMenu size={32} className="text-[#dbcfff]" />
							)}
						</motion.div>
					</button>

					<MobileNavbar isOpen={isOpen} toggleMenu={() => setIsOpen(false)} />
				</div>
			</div>
		</motion.nav>
	);
}

export default Navbar;
