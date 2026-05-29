// ===============================
// src/App.tsx
// =============================== APP.TSX
import "./index.css";
import AppProviders from "./providers/AppProviders";

// =============================== TOASTER
import { Toaster } from "react-hot-toast";

// ===================================== FUNCTION
export default function App() {
	return (
		<>
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 3500,

					style: {
						background: "#050816",
						color: "#dbcfff",
						border: "1px solid rgba(1,189,252,0.4)",
						borderRadius: "16px",
						padding: "14px 18px",
						fontSize: "13px",
						fontWeight: "500",
						backdropFilter: "blur(10px)",
						boxShadow: "0 0 30px rgba(1,189,252,0.15)",
					},

					success: {
						style: {
							border: "1px solid rgba(0,255,145,0.4)",
						},
					},

					error: {
						style: {
							border: "1px solid rgba(255,77,79,0.4)",
						},
					},
				}}
			/>

			<AppProviders />
		</>
	);
}
