// ===================================== IMAGE OPTIMIZATION
// UTILS = R

// =====================================
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
	...props
}: Props) {
	if (!publicId || publicId.trim() === "") return null;

	return (
		<img {...props} src={getCloudinaryUrl(publicId, { width, height, crop })} />
	);
}
