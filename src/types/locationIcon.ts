import userLocationURL from "@/assets/user-location.png";
import L from "leaflet";

export const locationIcon = L.icon({
	iconUrl: userLocationURL,
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});
