import iconeOnibusURL from "@/assets/onibus-icone.png";
import L from "leaflet";

export const iconeOnibus = L.icon({
	iconUrl: iconeOnibusURL,
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});
