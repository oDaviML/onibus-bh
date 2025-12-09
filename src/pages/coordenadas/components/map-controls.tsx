import { motion } from "framer-motion";
import L from "leaflet";
import { Crosshair, Map as MapIcon, Moon, RefreshCw, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useTheme } from "@/contexts/ThemeContext";

type MapControlsProps = {
	refetch: () => void;
	isLoading: boolean;
	userLocation: { latitude: number; longitude: number };
	buses: Array<{ latitude: number; longitude: number }> | undefined;
};

export const MapControls = ({ refetch, isLoading, userLocation, buses }: MapControlsProps) => {
	const map = useMap();
	const { theme, setTheme } = useTheme();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const duration = 10000;
		const interval = 50;
		const step = 100 / (duration / interval);

		const timer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) return 0;
				return prev + step;
			});
		}, interval);

		return () => clearInterval(timer);
	}, []);

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
				transition={{ delay: 0.2 }}
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				whileTap={{ scale: 0.95 }}
				type="button"
				className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-3.5 text-stone-600 dark:text-stone-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-800 relative"
				title="Alternar tema"
			>
				<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</motion.button>

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

			<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
				<button
					onClick={() => {
						refetch();
						setProgress(0);
					}}
					type="button"
					className="relative w-12 h-12 rounded-2xl shadow-lg transition-transform active:scale-95 group overflow-hidden"
					title="Atualizar Localização"
				>
					<div
						className="absolute inset-0 rounded-2xl transition-all duration-100 ease-linear"
						style={{
							background: `conic-gradient(from 0deg, #0ea5e9 ${progress}%, transparent ${progress}%)`,
						}}
					/>

					<div className="absolute inset-[2px] bg-white dark:bg-stone-900 rounded-[14px] flex items-center justify-center">
						<RefreshCw
							size={20}
							className={`text-stone-600 dark:text-stone-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors ${isLoading ? "animate-spin text-sky-500" : ""}`}
						/>
					</div>
				</button>
			</motion.div>
		</div>
	);
};
