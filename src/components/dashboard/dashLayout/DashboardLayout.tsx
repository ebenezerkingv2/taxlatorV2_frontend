// =====================================
// src/dashboard/dashLayout/DashboardLayout.tsx
// ===================================== DASHBOARD LAYOUT COMPONENT
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import HeroFrame from "../../ui/frames/HeroFrame";
import DashboradOutletFrame from "../dashComponents/frames/DashboardOutletFrame";

import Sidebar from "../dashComponents/Sidebar";
import Topbar from "../dashComponents/Topbar";

import { MdDashboard, MdCalculate, MdPerson } from "react-icons/md";

import useAuthSocket from "../../../hooks/useAuthSocket";
import { useUser } from "../../../context/useUser";

export default function DashboardLayout() {
	const [collapsed, setCollapsed] = useState(true);
	const [heroDone, setHeroDone] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	// =============================== SOCKET AUTH SYNC
	const { user } = useUser();
	useAuthSocket(user?.id);

	// =============================== NAV ITEMS (ONLY ONCE)
	const navItems = [
		{ name: "Overview", icon: MdDashboard, path: "/dashboard" },
		{
			name: "Calculations History",
			icon: MdCalculate,
			path: "/dashboard/calculations",
		},
		{ name: "Profile", icon: MdPerson, path: "/dashboard/profile" },
	];

	return (
		<HeroFrame
			onAnimationComplete={() => setHeroDone(true)}
			className="flex w-full min-h-screen bg-gradient-to-b from-black via-[#000aff] to-black"
		>
			<div className="flex w-full min-h-screen">
				<Sidebar
					collapsed={collapsed}
					setCollapsed={setCollapsed}
					location={location}
					navigate={navigate}
					navItems={navItems}
				/>

				<div className="flex-1 ml-[4rem] pr-4 md:px-4 flex flex-col min-h-screen transition-all duration-400">
					<Topbar />

					{/* ========================= MAIN OUTLET */}
					<main>
						<DashboradOutletFrame
							startAnimation={heroDone}
							className="flex-1 my-[8rem] md:max-w-5xl mx-auto"
						>
							<Outlet />
						</DashboradOutletFrame>
					</main>
				</div>
			</div>
		</HeroFrame>
	);
}
