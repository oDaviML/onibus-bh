import ServerError from "@/components/serverError";
import Spinner from "@/components/spinner";
import { useCoordenadas } from "@/hooks/useCoordenadas";
import { getLineColor } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { Clock, Gauge } from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "@/index.css";
import { createBusIcon, createUserLocationIcon } from "./components/custom-icons";
import { FloatingHeader } from "./components/floating-header";
import { MapController } from "./components/map-controller";
import { StatsLegend } from "./components/stats-legend";
import { MapControls } from "./components/map-controls";
import { useTheme } from "@/contexts/ThemeContext";

type CoordenadasProps = {
	numeroLinha: string;
	sentido: string;
};

export default function Coordenadas({ numeroLinha, sentido }: CoordenadasProps) {
	const {
		onibus,
		linha,
		location,
		isError,
		isLoading,
		loading,
		handleSentidoChange,
		getBusPopupContent,
		refetch,
		numeroLinhaNumber,
	} = useCoordenadas({ numeroLinha, sentido });

	const color = getLineColor(numeroLinhaNumber);
	const lineColor = color.bg;
	const textColor = color.text;

	const { theme } = useTheme();
	const [tileUrl, setTileUrl] = useState(
		"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
	);

	useEffect(() => {
		const isDark =
			theme === "dark" ||
			(theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

		setTileUrl(
			isDark
				? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
				: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
		);
	}, [theme]);

	if (isError) return <ServerError />;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="h-[100dvh] w-full flex flex-col relative bg-stone-50 dark:bg-stone-900 isolate overflow-hidden"
		>
			<FloatingHeader
				linha={linha}
				numeroLinha={numeroLinha}
				sentido={sentido}
				handleSentidoChange={handleSentidoChange}
				lineColor={lineColor}
				textColor={textColor}
			/>

			{/* Map */}
			<div className="flex-1 w-full relative z-0">
				{(isLoading || loading) && !onibus?.data ? (
					<div className="absolute inset-0 flex items-center justify-center bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-sm z-10">
						<Spinner />
					</div>
				) : (
					<MapContainer
						center={[location.latitude, location.longitude]}
						zoom={13}
						style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
						zoomControl={false}
						className="z-0 outline-none"
					>
						<TileLayer
							attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
							url={tileUrl}
						/>
						<MapController />
						<MapControls
							refetch={refetch}
							isLoading={isLoading}
							userLocation={location}
							buses={onibus?.data}
						/>

						{/* User Location */}
						<Marker position={[location.latitude, location.longitude]} icon={createUserLocationIcon()}>
							<Popup>
								<div className="font-bold">Você está aqui</div>
							</Popup>
						</Marker>

						{/* Buses */}
						{onibus?.data.map((bus) => {
							if (bus.sentido != null && Number(bus.sentido) !== 3) {
								const busInfo = getBusPopupContent(bus);
								return (
									<Marker
										key={bus.numeroVeiculo}
										position={[bus.latitude, bus.longitude]}
										icon={createBusIcon(lineColor)}
									>
										<Popup className="custom-popup" closeButton={false}>
											<div className="p-1 min-w-[150px] bg-white dark:bg-stone-800 rounded-lg shadow-sm">
												<div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-100 dark:border-stone-700">
													<span className="font-bold text-stone-800 dark:text-stone-100">
														Veículo {busInfo.numeroVeiculo}
													</span>
													<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
												</div>
												<div className="space-y-1.5">
													<div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 text-sm">
														<Gauge size={14} />
														<span>{busInfo.velocidade} km/h</span>
													</div>
													<div className="flex items-center gap-2 text-stone-500 dark:text-stone-500 text-xs">
														<Clock size={14} />
														<span>Atualizado: {busInfo.horarioFormatado}</span>
													</div>
												</div>
											</div>
										</Popup>
									</Marker>
								);
							}
							return null;
						})}
					</MapContainer>
				)}
			</div>

			<StatsLegend count={onibus?.data.length ?? 0} />
		</motion.div>
	);
}