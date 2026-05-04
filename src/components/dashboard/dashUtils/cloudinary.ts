// =============================== CLOUDINARY IMAGE TRANSFORMATION
// // UTILS = R

// ===============================
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// ===============================
type CloudinaryOptions = {
	width?: number;
	height?: number;
	crop?: "fill" | "scale" | "fit" | "thumb";
};

// ===============================
export function getCloudinaryUrl(
	publicId: string,
	options: CloudinaryOptions = {},
) {
	const transforms = [
		"f_auto",
		"q_auto",
		options.width && `w_${options.width}`,
		options.height && `h_${options.height}`,
		options.crop && `c_${options.crop}`,
	]
		.filter(Boolean)
		.join(",");
	return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
