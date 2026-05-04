// ===================================== TIME AND DATE
// // UTILS = R

// =====================================
import { useEffect, useState } from "react";

// =====================================
interface TimeDateProps {
	className?: string;
}

// =====================================
const TimeDate = ({ className = "" }: TimeDateProps) => {
	const [gmtTime, setGmtTime] = useState<string>("");

	const [gmtDate, setGmtDate] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();

			// ================= TIME
			const time = now.toLocaleString("en-GB", {
				timeZone: "UTC",

				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",

				hour12: false,
			});

			// ================= DATE (FULL CONTROL)
			const date = now.toLocaleString("en-GB", {
				timeZone: "UTC",

				weekday: "short",
				day: "numeric",
				month: "long",
				year: "numeric",
			});

			setGmtTime(`${time} GMT`);

			setGmtDate(date);
		};

		updateTime();

		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className={`time-date__parent flex flex-col leading-none font-bold ${className}`}
		>
			<p className="m-1">{gmtTime}</p>

			<p className="m-1">{gmtDate}</p>
		</div>
	);
};

export default TimeDate;
