// =====================================
// src/components/layout/PublicLayout.tsx
// ===================================== LAYOUT SHELL COMPONENT

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ===================================== FUNCTION
export default function Shell() {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Navbar />

			{/* ===================== PAGE CONTENT (ROUTES RENDER HERE) */}
			<main className="flex-1 w-full pt-[80px]">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
