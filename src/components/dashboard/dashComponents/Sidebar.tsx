// =====================================
// src/dashboard/dashComponents/Sidebar.tsx
// ===================================== DASHBOARD SIDEBAR COMPONENT

import { motion } from "framer-motion";
import type { Location, NavigateFunction } from "react-router-dom";
import type { IconType } from "react-icons";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoHome } from "react-icons/io5";

// ===================================== DATA
type NavItem = {
	name: string;
	icon: IconType;
	path: string;
};

// ===================================== PROPS
type SidebarProps = {
	collapsed: boolean;
	setCollapsed: (val: boolean) => void;
	location: Location;
	navigate: NavigateFunction;
	navItems: NavItem[];
};

// ===================================== FUNCTION
export default function Sidebar({
	collapsed,
	setCollapsed,
	location,
	navigate,
	navItems,
}: SidebarProps) {
	// ===================== LOGOUT HANDLER
	const handleLogout = () => {
		// =================== 1. Clear auth data
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		// =================== 2. Redirect to login
		navigate("/");
	};

	return (
		<motion.aside
			layout="position"
			initial={false}
			animate={{
				x: 0,
				opacity: 1,
				width: collapsed ? 60 : 200,
			}}
			transition={{ duration: 0.9, ease: "easeOut" }}
			className="fixed min-h-screen top-0 bottom-0 z-50 bg-gradient-to-b from-black via-[#f4ab17] to-black border-r-8 border-[#f4ab17]/20 backdrop-blur-md flex flex-col"
		>
			{/* ============================================================ */}
			{/* ============================================================ */}
			{/* ================= HEADER ================= */}
			<div className="h-[80px] bg-black px-2 border-b-8 border-[#f4ab17]/20 flex justify-between items-center shrink-0">
				<motion.div
					animate={{
						opacity: collapsed ? 0 : 1,
						scale: collapsed ? 0.8 : 1,
					}}
					transition={{ duration: 1.0 }}
					className="overflow-hidden"
				>
					<img
						src="/taxlator.webp"
						alt="Taxlator"
						className="w-[8.5rem] h-auto block"
					/>
				</motion.div>

				<button
					onClick={() => setCollapsed(!collapsed)}
					className="text-[#dbcfff] flex-shrink-0 bg-[#01bdfc] shadow-[0_0_12px_4px_#01bdfc] transition duration-400 cursor-pointer"
				>
					<motion.div
						initial={false}
						animate={{ rotate: collapsed ? 360 : 0 }}
						transition={{ duration: 0.9 }}
					>
						{collapsed ? (
							<GiHamburgerMenu size={28} className="text-black" />
						) : (
							<FaTimes size={28} className="text-black" />
						)}
					</motion.div>
				</button>
			</div>

			{/* ============================================================ */}
			{/* ============================================================ */}
			{/* ================= NAV ================= */}
			<div className="flex flex-col flex-1 pt-8 pb-3">
				<motion.nav className="px-2 space-y-4 text-sm text-[#dbcfff]">
					{navItems.map((item) => {
						const Icon = item.icon;

						const isActive =
							item.path === "/dashboard"
								? location.pathname === "/dashboard"
								: location.pathname.startsWith(item.path) ||
									(item.path === "/dashboard/calculations" &&
										location.pathname.startsWith("/dashboard/tax"));

						return (
							<button
								key={item.name}
								onClick={() => navigate(item.path)}
								className={`w-full flex items-center gap-3 relative px-2 py-2 rounded-lg transition duration-400 cursor-pointer
								${isActive ? "text-[#01bdfc]" : "text-[#dbcfff]"}`}
							>
								{/* ================= ACTIVE INDICATOR ================= */}
								{isActive && (
									<motion.span
										layoutId="activeIndicator"
										className="absolute left-0 top-0 h-full w-[4px] bg-[#01bdfc] shadow-[0_0_12px_#01bdfc] rounded-r-full"
									/>
								)}

								{/* ================= ICON ================= */}
								<span className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
									<Icon size={24} />
								</span>

								{/* ================= TEXT ================= */}
								<motion.span
									initial={false}
									animate={{
										opacity: collapsed ? 0 : 1,
										scale: collapsed ? 0.85 : 1,
										x: collapsed ? -8 : 0,
									}}
									transition={{ duration: 0.9, ease: "easeOut" }}
									className="whitespace-nowrap overflow-hidden"
								>
									{item.name}
								</motion.span>
							</button>
						);
					})}
				</motion.nav>

				{/* ============================================================ */}
				{/* ====================== HOME AND SIGNOUT ===================== */}
				<div className="mt-auto">
					{/* ================= HOME ================= */}
					<div className="home_parent p-1">
						<button
							onClick={() => navigate("/")}
							className="w-full flex items-center rounded-lg text-[#dbcfff] hover:text-[#01bdfc] hover:shadow-[0_0_12px_4px_#01bdfc] transition duration-300 cursor-pointer"
						>
							<div className="flex items-center gap-3 w-full p-[0.5rem]">
								<span className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
									<IoHome size={28} />
								</span>

								<motion.span
									initial={false}
									animate={{
										opacity: collapsed ? 0 : 1,
										scale: collapsed ? 0.85 : 1,
										x: collapsed ? -8 : 0,
									}}
									transition={{ duration: 0.9 }}
									className="whitespace-nowrap overflow-hidden"
								>
									Home
								</motion.span>
							</div>
						</button>
					</div>

					{/* ================= SIGN OUT ================= */}
					<div className="signout_parent p-1 mt-2">
						<button
							onClick={handleLogout}
							className="w-full flex items-center rounded-lg text-[#dbcfff] hover:text-[#01bdfc] hover:shadow-[0_0_12px_4px_#01bdfc] transition duration-300 cursor-pointer"
						>
							<div className="flex items-center gap-3 w-full p-[0.5rem]">
								<span className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
									<MdLogout size={24} />
								</span>

								<motion.span
									initial={false}
									animate={{
										opacity: collapsed ? 0 : 1,
										scale: collapsed ? 0.85 : 1,
										x: collapsed ? -8 : 0,
									}}
									transition={{ duration: 0.9 }}
									className="whitespace-nowrap overflow-hidden"
								>
									Sign Out
								</motion.span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</motion.aside>
	);
}
