// =====================================
// src/config/footerData.ts
// ===================================== FOOTER DATA CONFIG COMPONENT

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

// ==================================== FUNCTION
export const footerLinks = [
	{
		title: "Legal",
		links: [
			{ label: "AboutUs", to: "/about-us" },
			{ label: "Privacy Policy", to: "/privacy-policy" },
			{ label: "Terms of Service", to: "/terms-conditions" },
		],
	},
];

// ==================================== FUNCTION
export const socialLinks = [
	{
		icon: FaWhatsapp,
		href: "https://wa.me/message/UHRWC3UBMMB2E1",
	},
	{
		icon: RiTwitterXLine,
		href: "https://x.com/dev_kingv2",
	},
	{
		icon: FaLinkedin,
		href: "https://www.linkedin.com/in/ebenezer-kingv2",
	},
	{
		icon: FaGithub,
		href: "https://github.com/ebenezerkingv2",
	},
];
