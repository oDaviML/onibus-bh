import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MapController = () => {
	const map = useMap();

	useEffect(() => {
		const timer = setTimeout(() => {
			map.invalidateSize();
		}, 250);
		return () => clearTimeout(timer);
	}, [map]);

	return null;
};
