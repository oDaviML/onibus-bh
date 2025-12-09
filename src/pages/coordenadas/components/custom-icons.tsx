import L from "leaflet";
import { Bus, User } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

export const createBusIcon = (color: string) => {
	const svgString = renderToStaticMarkup(
		<div
			className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md ${color}`}
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

export const createUserLocationIcon = () => {
	const svgString = renderToStaticMarkup(
		<div className="relative flex items-center justify-center w-12 h-12">
			<div className="absolute w-full h-full bg-sky-500/30 rounded-full animate-ping" />
			<div className="relative w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center border-[3px] border-white shadow-lg">
				<User size={16} className="text-white" strokeWidth={3} />
			</div>
		</div>,
	);

	return L.divIcon({
		className: "custom-user-icon",
		html: svgString,
		iconSize: [48, 48],
		iconAnchor: [24, 24],
		popupAnchor: [0, -24],
	});
};
