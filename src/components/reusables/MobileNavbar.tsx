// ===================================== MOBILE NAV BAR
// src/components/reusables/MobileNavbar.tsx

// =====================================
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getNavLinks } from "../../config/navLinks";
import NavLinkStyle from "../ui/links/NavLinkStyle";
import { logout } from "../../utils/auth";
import TaxOptionsButton from "../ui/buttons/TaxOptionsButton";
import { getToken } from "../../utils/auth";

// =====================================
type MobileNavbarProps = {
	isOpen: boolean;
	toggleMenu: () => void;
};

// =====================================
function MobileNavbar({ isOpen, toggleMenu }: MobileNavbarProps) {
	const navigate = useNavigate();

	const token = getToken();
	const isAuthenticated = Boolean(token);

	const navLinks = getNavLinks(isAuthenticated);

	// ===================================== LOGOUT HANDLER
	const handleLogout = () => {
		logout();
		navigate("/login-page");
		toggleMenu();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* BLOCKER */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-30"
					/>

					{/* MENU */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "150%" }}
						transition={{ duration: 0.9, ease: "easeOut" }}
						className="absolute top-[80px] right-4 z-40 text-[1.5rem]"
					>
						<div className="relative block w-[15rem] overflow-hidden rounded-2xl bg-gradient-to-b from-black via-[#000aff] to-black py-10 text-center text-[1.2rem]">
							{/* LEFT LINE */}
							<span className="absolute left-0 top-0 h-0 w-[2px] bg-[#f4ab17] transition-all duration-400 h-full shadow-[0_0_20px_4px_#f4ab17]" />

							{/* RIGHT LINE */}
							<span className="absolute right-0 bottom-0 h-0 w-[2px] bg-[#01bdfc] transition-all duration-300 h-full shadow-[0_0_20px_4px_#01bdfc]" />

							{/* CONTENT */}
							<ul className="flex flex-col items-start gap-4 w-full px-3">
								{navLinks.map((link, index) => (
									<li key={index} className="w-full">
										{/* NORMAL LINK */}
										{link.type === "link" && link.path && (
											<NavLinkStyle to={link.path} onClick={toggleMenu}>
												{link.name}
											</NavLinkStyle>
										)}

										{/* TAX OPTIONS */}
										{link.type === "tax-options" && (
											<TaxOptionsButton
												onClick={toggleMenu}
												className="w-full py-2"
											>
												Tax Options
											</TaxOptionsButton>
										)}

										{/* LOGOUT (ACTION TYPE) */}
										{link.type === "action" && (
											<button
												onClick={handleLogout}
												className="
													relative w-full block group font-bold py-2
													bg-black/30 hover:bg-black
													transition-colors duration-400
													cursor-pointer
												"
											>
												{link.name}

												{/* TOP LINE */}
												<span className="absolute left-0 top-0 h-[2px] bg-[#f4ab17] transition-all duration-400 w-0 group-hover:w-full" />

												{/* BOTTOM LINE */}
												<span className="absolute right-0 bottom-0 h-[2px] bg-[#01bdfc] transition-all duration-400 w-0 group-hover:w-full" />
											</button>
										)}
									</li>
								))}
							</ul>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

export default MobileNavbar;
