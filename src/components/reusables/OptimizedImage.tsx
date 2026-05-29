// =====================================
// src/components/reusables/OptimizedImage.tsx
// ===================================== IMAGE OPTIMIZATION COMPONENT
import React, { useState } from "react";
import { getCloudinaryUrl } from "../dashboard/dashUtils/cloudinary";

// =====================================
type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
	publicId: string;
	width?: number;
	height?: number;
	crop?: "fill" | "scale" | "fit" | "thumb";
};

// =====================================
export default function OptimizedImage({
	publicId,
	width,
	height,
	crop,
	className = "",
	...props
}: Props) {
	const [loading, setLoading] = useState(true);

	if (!publicId || publicId.trim() === "") return null;

	return (
		<div className="relative">
			{/* ================= SKELETON */}
			{loading && (
				<div className="absolute inset-0 rounded-full bg-gray-800 animate-pulse" />
			)}

			<img
				{...props}
				src={getCloudinaryUrl(publicId, { width, height, crop })}
				onLoad={() => setLoading(false)}
				className={className}
			/>
		</div>
	);
}
