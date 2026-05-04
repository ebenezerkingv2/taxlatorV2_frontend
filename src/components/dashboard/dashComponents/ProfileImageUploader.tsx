// =====================================
// src/components/dashboard/dashComponents/ProfileImageUploader.tsx
// ===================================== PROFILE IMAGE UPLOADER
import { useState } from "react";
import { useUser } from "../../../context/useUser";
import { IoCameraSharp } from "react-icons/io5";
import OptimizedImage from "../../reusables/OptimizedImage";
import { safeImage } from "../../dashboard/dashUtils/safeImage";

// =====================================
type ProfileImageUploaderProps = {
	className?: string;
};

// =====================================
export default function ProfileImageUploader({
	className = "",
}: ProfileImageUploaderProps) {
	const { user, updateUser } = useUser();
	const [loading, setLoading] = useState(false);

	const fallbackImage = "tzngs8muzgqookwb09ia";

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setLoading(true);

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "taxlator_profile");

		try {
			const res = await fetch(
				"https://api.cloudinary.com/v1_1/dfupktkqb/image/upload",
				{
					method: "POST",
					body: formData,
				},
			);

			const data = await res.json();

			console.log("UPLOAD STATUS:", res.status);
			console.log("UPLOAD DATA:", data);

			if (!data.public_id) {
				console.error("No public_id returned");
				return;
			}

			await updateUser({
				image: data.public_id,
			});
		} catch (err) {
			console.error("Upload failed", err);
		} finally {
			setLoading(false);
		}
	};

	const imagePublicId = safeImage(user?.image) ?? fallbackImage;

	return (
		<div className={`relative w-40 h-40 md:w-45 md:h-45 ${className}`}>
			<OptimizedImage
				publicId={imagePublicId}
				alt="Profile"
				width={300}
				height={300}
				crop="fill"
				className="w-full h-full object-cover border-4 border-[#01bdfc] rounded-full"
			/>

			{loading && (
				<div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center z-10">
					<p className="text-white text-xs font-semibold tracking-wide">
						Loading...
					</p>
				</div>
			)}

			<input
				disabled={loading}
				type="file"
				accept="image/*"
				onChange={handleImageUpload}
				className="hidden"
				id="profileUpload"
			/>

			<label
				htmlFor="profileUpload"
				className="absolute bottom-0 right-0 bg-[#01bdfc]/5 rounded cursor-pointer 
				text-[#01bdfc] hover:text-white hover:bg-black/10 transition duration-300"
			>
				<IoCameraSharp size={45} />
			</label>
		</div>
	);
}
