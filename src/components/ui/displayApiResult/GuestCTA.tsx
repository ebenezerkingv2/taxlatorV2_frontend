// =====================================
// src/components/ui/displayApiResult/GuestCTA.tsx
// ===================================== GUEST CTA
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/ui/inputs/InputField";
import GeneralButton from "../../../components/ui/buttons/GeneralButton";
import { checkEmailApi } from "../../../api//user.api";

// =====================================
type GuestCTAProps = {
	prefillEmail?: string;
};

// =====================================
export default function GuestCTA({ prefillEmail = "" }: GuestCTAProps) {
	const [email, setEmail] = useState(prefillEmail);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// =====================================
	async function handleProceed() {
		if (!email) {
			setError("Please enter your email");
			return;
		}

		setBusy(true);
		setError("");

		// ===================================== API CHECK
		try {
			const data = await checkEmailApi(email);

			if (data.exists) {
				navigate("/login-page", { state: { email } });
			} else {
				navigate("/signUp-page", { state: { email } });
			}
		} catch (err: unknown) {
			console.error(err);

			setError(
				err instanceof Error
					? err.message || "Failed to check email. Try again."
					: "Failed to check email. Try again.",
			);
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className="w-full mt-10 rounded-xl bg-gradient-to-b from-black via-[#000aff] to-black border border-[#01bdfc]/20 p-4">
			{/* ================= HEADER ================= */}
			<div className="font-semibold text-sm text-[#01bdfc]">
				Save Your Calculations
			</div>
			<div className="text-xs text-[#dbcfff]/70 mt-1">
				Sign up to save and track your tax history.
			</div>
			{/* ================= INPUT ROW ================= */}
			<div className="mt-5 flex items-end gap-2">
				<div className="flex-1">
					<InputField
						id="guestCTA"
						label="Email"
						type="email"
						value={email}
						autoComplete="email"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						inputClassName="w-full"
					/>
				</div>

				{/* ===================== BUTTON */}
				<GeneralButton
					onClick={handleProceed}
					className="w-28 h-14 rounded-lg text-sm font-semibold bg-gradient-to-b from-black via-[#000aff] to-black text-[#01bdfc] border border-[#01bdfc]/30 relative"
				>
					<span className={busy ? "opacity-0" : "opacity-100"}>Continue</span>

					{busy && (
						<span className="absolute inset-0 grid place-items-center text-xs text-[#01bdfc]">
							Checking...
						</span>
					)}
				</GeneralButton>
			</div>

			{/* ================= ERROR ================= */}
			{error && (
				<div className="text-xs text-[#f4ab17] mt-3 text-center">{error}</div>
			)}
		</div>
	);
}
