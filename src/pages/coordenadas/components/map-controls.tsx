import { motion } from "framer-motion";
import L from "leaflet";
import { Crosshair, Map as MapIcon, RefreshCw } from "lucide-react";
import { useMap } from "react-leaflet";

type MapControlsProps = {
	refetch: () => void;
	isLoading: boolean;
	userLocation: { latitude: number; longitude: number };
	buses: Array<{ latitude: number; longitude: number }> | undefined;
};

export const MapControls = ({ refetch, isLoading, userLocation, buses }: MapControlsProps) => {
	const map = useMap();

	const handleCenterUser = () => {
		map.flyTo([userLocation.latitude, userLocation.longitude], 15);
	};

	const handleFitBounds = () => {
		if (buses && buses.length > 0) {
			const bounds = L.latLngBounds(buses.map((b) => [b.latitude, b.longitude]));
			map.fitBounds(bounds, { padding: [50, 50] });
		}
	};

	return (
		<div className="absolute bottom-20 right-4 z-[1000] flex flex-col gap-2">
			<motion.button
				initial={{ x: 20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}
				onClick={handleCenterUser}
				whileTap={{ scale: 0.95 }}
				type="button"
				className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-3.5 text-stone-600 dark:text-stone-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-800"
				title="Centralizar em mim"
			>
				<Crosshair size={20} />
			</motion.button>

			<motion.button
				initial={{ x: 20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.4 }}
				onClick={handleFitBounds}
				whileTap={{ scale: 0.95 }}
				type="button"
				className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-3.5 text-stone-600 dark:text-stone-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-800"
				title="Ver todos os ônibus"
			>
				<MapIcon size={20} />
			</motion.button>

			<motion.button
				initial={{ x: 20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.5 }}
				onClick={() => refetch()}
				whileTap={{ scale: 0.95 }}
				type="button"
				className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-3.5 text-stone-600 dark:text-stone-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-800"
				title="Atualizar Localização"
			>
				<RefreshCw size={20} className={`${isLoading ? "animate-spin" : ""}`} />
			</motion.button>
		</div>
	);
};
