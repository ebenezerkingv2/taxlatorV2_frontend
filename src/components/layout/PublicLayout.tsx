// =====================================
// src/components/layout/PublicLayout.tsx
// ===================================== LAYOUT SHELL COMPONENT
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "@components/reusables/BackToTop";

// ===================================== FUNCTION
export default function Shell() {
	return (
		<div className="w-full min-h-screen flex flex-col">
			{/* ============== HEADER ============== */}
			<Navbar />

			{/* ============== MAIN ============== */}
			<main className="flex-1 w-full pt-[80px]">
				<Outlet />
			</main>

			{/* ============== FOOTER ============== */}
			<Footer />

			{/* ============== BACK TO TOP ============== */}
			<BackToTop />
		</div>
	);
}
