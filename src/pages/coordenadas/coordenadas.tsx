import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import L from "leaflet";
import ServerError from "@/components/serverError";
import Spinner from "@/components/spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCoordenadas } from "@/hooks/useCoordenadas";
import { getLineColor } from "@/lib/utils";
import { locationIcon } from "@/types/locationIcon";
import "leaflet/dist/leaflet.css";
import { ArrowLeft, Bus, Clock, Gauge, Navigation, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "@/index.css";

type CoordenadasProps = {
	numeroLinha: string;
	sentido: string;
};

const createBusIcon = (color: string) => {
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

const MapController = () => {
	const map = useMap();

	useEffect(() => {
		const timer = setTimeout(() => {
			map.invalidateSize();
		}, 250);
		return () => clearTimeout(timer);
	}, [map]);

	return null;
};

export default function Coordenadas({ numeroLinha, sentido }: CoordenadasProps) {
	const {
		onibus,
		linha,
		location,
		sentidoNumber,
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

	if (isError) return <ServerError />;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="h-[100dvh] w-full flex flex-col relative bg-stone-50 dark:bg-stone-900 isolate overflow-hidden"
		>
			{/* Floating Header */}
			<div className="absolute top-0 left-0 right-0 z-[1000] p-4 pointer-events-none flex flex-col items-center sm:flex-row sm:justify-between sm:items-start gap-4">
				{/* Info Card & Back Button */}
				<div className="flex flex-col gap-2 w-full sm:w-auto items-center sm:items-start">
					<motion.div
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-4 flex items-center gap-4 pointer-events-auto border border-stone-200 dark:border-stone-800 w-full sm:w-auto max-w-md"
					>
						<Link
							to="/"
							className="p-2.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors text-stone-600 dark:text-stone-300 border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
							aria-label="Voltar"
						>
							<ArrowLeft size={20} />
						</Link>

						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-0.5">
								<span
									className="px-2 py-0.5 rounded-md text-xs font-bold tracking-wide"
									style={{ backgroundColor: lineColor, color: textColor }}
								>
									{linha?.data.linha || numeroLinha}
								</span>
								<h2 className="font-bold text-stone-800 dark:text-stone-100 truncate text-sm sm:text-base max-w-[150px] sm:max-w-xs">
									{linha?.data.nome || "Carregando..."}
								</h2>
							</div>
							<div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
								<Navigation size={12} className="text-sky-500" />
								<span className="uppercase tracking-wide">
									{linha?.data.sentidoIsUnique ? "Sentido Único" : sentidoNumber === 1 ? "Ida" : "Volta"}
								</span>
							</div>
						</div>
					</motion.div>

					{/* Direction Toggle */}
					{!linha?.data.sentidoIsUnique && (
						<motion.div
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-1.5 pointer-events-auto border border-stone-200 dark:border-stone-800 w-full sm:w-auto flex justify-center"
						>
							<ToggleGroup type="single" value={sentido} onValueChange={handleSentidoChange} className="gap-1 w-full">
								<ToggleGroupItem
									value="1"
									className="flex-1 px-4 text-xs data-[state=on]:bg-sky-100 data-[state=on]:text-sky-700 dark:data-[state=on]:bg-sky-900/30 dark:data-[state=on]:text-sky-400"
								>
									Ida
								</ToggleGroupItem>
								<ToggleGroupItem
									value="2"
									className="flex-1 px-4 text-xs data-[state=on]:bg-sky-100 data-[state=on]:text-sky-700 dark:data-[state=on]:bg-sky-900/30 dark:data-[state=on]:text-sky-400"
								>
									Volta
								</ToggleGroupItem>
							</ToggleGroup>
						</motion.div>
					)}
				</div>

				{/* Refresh Button */}
				<motion.button
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3 }}
					onClick={() => refetch()}
					whileTap={{ scale: 0.95 }}
					className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-3.5 text-stone-600 dark:text-stone-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white dark:hover:bg-stone-800 transition-all pointer-events-auto border border-stone-200 dark:border-stone-800 flex items-center gap-2"
					title="Atualizar Localização"
				>
					<RefreshCw size={20} className={`${isLoading ? "animate-spin" : ""}`} />
					<span className="text-sm font-semibold hidden sm:inline">Atualizar</span>
				</motion.button>
			</div>

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
							url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
						/>
						<MapController />

						{/* User Location */}
						<Marker position={[location.latitude, location.longitude]} icon={locationIcon}>
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
											<div className="p-1 min-w-[150px]">
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

			{/* Legend / Footer Overlay */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] pointer-events-none w-full flex justify-center px-4">
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="bg-stone-800/90 dark:bg-black/70 backdrop-blur-md text-stone-50 px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 pointer-events-auto border border-stone-700"
				>
					<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
					{onibus?.data.length ?? 0} ônibus em circulação
				</motion.div>
			</div>
		</motion.div>
	);
}
