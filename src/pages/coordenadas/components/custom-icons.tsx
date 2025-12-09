import L from "leaflet";
import { Bus } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

export const createBusIcon = (color: string) => {
	const svgString = renderToStaticMarkup(
		<div
			style={{
				backgroundColor: color,
				borderRadius: "50%",
				width: "32px",
				height: "32px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
				border: "2px solid white",
			}}
		>
			<Bus size={18} color="white" />
		</div>,
	);

	return L.divIcon({
		className: "custom-bus-icon",
		html: svgString,
		iconSize: [32, 32],
		iconAnchor: [16, 16],
		popupAnchor: [0, -16],
	});
};
