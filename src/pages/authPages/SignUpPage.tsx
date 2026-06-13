// =====================================
// src/pages/authPages/LoginOutPage.tsx
// ===================================== LOGIN OUT PAGE COMPONENT
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GeneralButton from "../../components/ui/buttons/GeneralButton";
import LegalAuthFrame from "../../components/ui/frames/LegalAuthFrame";
import InputField from "../../components/ui/inputs/InputField";
// =============================== TOAST
import toast from "react-hot-toast";

// ===================================== API HELPERS
import { registerApi } from "../../api/auth.api";
import { setAuth } from "../../utils/auth";

// ===================================== TYPES
type SignupError = {
	response?: {
		data?: {
			message?: string;
		};
	};
};

// ===================================== PAGE
export default function LoginOutPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const passedEmail = (location.state as { email?: string } | null)?.email;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState(passedEmail ?? "");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [loading, setLoading] = useState(false);

	// ===================================== API CONNECTION
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// ================= PASSWORD CHECK
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setLoading(true);

		try {
			const res = await registerApi(
				firstName + " " + lastName,
				email,
				password,
			);

			const { user, accessToken } = res;

			setAuth(accessToken, user);

			toast.success("Account created successfully");

			navigate("/dashboard");
		} catch (err) {
			const errorObj = err as SignupError;

			const message =
				errorObj?.response?.data?.message || "Signup failed. Try again.";

			toast.error(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div id="loginPage" className="bg-black py-16 overflow-hidden w-full">
			{/* ================= CONTENT WRAPPER ================= */}
			<div className="loginPage-parent w-full max-w-7xl mx-auto px-4">
				{/* ================= HEADER ================= */}
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold text-[#f4ab17] mt-2">
						Create Your Account
					</h1>

					<p className="text-xs text-[#dbcfff]/90 mt-1">
						Start using Taxlator for free
					</p>
				</div>

				{/* ================= FRAME + FORM ================= */}
				<LegalAuthFrame className="w-full max-w-2xl mx-auto rounded-2xl bg-gradient-to-b from-black via-[#000aff] to-black p-6">
					<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
						{/* ===================== FIRST NAME */}
						<div>
							<InputField
								id="First Name"
								label="First Name"
								type="text"
								autoComplete="given-name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="First Name"
							/>
						</div>

						{/* ===================== LAST NAME */}
						<div>
							<InputField
								id="Last Name"
								label="Last Name"
								type="text"
								autoComplete="family-name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Last Name"
							/>
						</div>

						{/* ===================== EMAIL */}
						<div>
							<InputField
								id="Email"
								label="Email"
								type="email"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email Address"
							/>
						</div>

						{/* ===================== PASSWORD */}
						<div>
							<InputField
								id="Paasword"
								label="Password"
								type="password"
								value={password}
								autoComplete="new-password"
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
							/>
						</div>

						{/* ===================== CONFIRM PASSWORD */}
						<div>
							<InputField
								id="Password"
								label="Password"
								type="password"
								value={confirmPassword}
								autoComplete="new-password"
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirm Password"
							/>
						</div>

						{/* ===================== BUTTON */}
						<GeneralButton type="submit" className="mt-1" disabled={loading}>
							{loading ? "Creating Account..." : "Sign Up"}
						</GeneralButton>

						{/* ===================== LINKS */}
						<div className="text-center text-xs text-[#dbcfff]/80 mt-3">
							Already have an account?{" "}
							<Link
								to="/login-page"
								className="text-sm text-[#01bdfc] hover:text-[#f4ab17] font-bold"
							>
								Login
							</Link>
						</div>
					</form>
				</LegalAuthFrame>
			</div>
		</div>
	);
}
