import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/index.css";

import ServerError from "@/components/serverError";
import Spinner from "@/components/spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCoordenadas } from "@/hooks/useCoordenadas";
import { iconeOnibus } from "@/types/iconeOnibus";
import { locationIcon } from "@/types/locationIcon";
import { LocateFixed, ZoomIn } from "lucide-react";

type CoordenadasProps = {
	numeroLinha: string;
	sentido: string;
};

export default function Coordenadas({ numeroLinha, sentido }: CoordenadasProps) {
	const {
		onibus,
		linha,
		location,
		timeAgo,
		sentidoNumber,
		isError,
		isLoading,
		loading,
		handleSentidoChange,
		centerOnUser,
		fitAllBuses,
		getBusPopupContent
	} = useCoordenadas({ numeroLinha, sentido });

	function InnerMapControls() {
		const map = useMap();

		return (
			<div className="leaflet-bottom leaflet-right mb-4 mr-2">
				<div className="leaflet-control leaflet-bar flex flex-col gap-1 bg-white p-1 rounded-md shadow-lg">
					<button
						type="button"
						onClick={() => centerOnUser(map)}
						title="Centralizar na sua posição"
						className="p-2 hover:bg-gray-100 rounded-md"
					>
						<LocateFixed className="h-5 w-5 text-gray-700" />
					</button>
					<button
						type="button"
						onClick={() => fitAllBuses(map)}
						title="Ver todos os ônibus no mapa"
						className="p-2 hover:bg-gray-100 rounded-md"
					>
						<ZoomIn className="h-5 w-5 text-gray-700" />
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 flex flex-col gap-4">
			<header className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
				<h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
					{linha?.data.linha} - {linha?.data.nome}
				</h1>
				<p className="text-lg text-slate-500 dark:text-slate-400 mt-1">
					Sentido: {sentidoNumber === 1 ? "Ida / Único" : "Volta"}
				</p>
				<div className="flex justify-between items-center mt-3 text-sm">
					<p className="text-slate-600 dark:text-slate-300">
						<strong>{onibus?.data.length ?? 0}</strong> veículos em operação
					</p>
					<div className="text-green-600 dark:text-green-400 font-medium min-w-0 text-right">
						{isLoading ? "Atualizando..." : `Atualizado ${timeAgo}`}
					</div>
				</div>
			</header>

			{!linha?.data.sentidoIsUnique && (
				<ToggleGroup
					type="single"
					defaultValue={sentido}
					onValueChange={handleSentidoChange}
					className="w-full"
				>
					<ToggleGroupItem value="1" className="w-full">
						Ver sentido Ida
					</ToggleGroupItem>
					<ToggleGroupItem value="2" className="w-full">
						Ver sentido Volta
					</ToggleGroupItem>
				</ToggleGroup>
			)}

			{isError && <ServerError />}

			{(isLoading || loading) && <Spinner />}

			{!isError && !loading && (
				<div className="rounded-lg overflow-hidden shadow-md">
					<MapContainer
						center={[location.latitude, location.longitude]}
						zoom={16}
						style={{ height: "60vh", width: "100%" }}
						key={`${location.latitude}-${location.longitude}`}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={[location.latitude, location.longitude]} icon={locationIcon} />
						{!isLoading &&
							onibus?.data.map((bus) => {
								if (bus.sentido != null || Number(bus.sentido) !== 3) {
									const busInfo = getBusPopupContent(bus);
									return (
										<Marker
											key={bus.numeroVeiculo}
											position={[bus.latitude, bus.longitude]}
											icon={iconeOnibus}
										>
											<Popup>
												<div className="flex flex-col gap-1 text-sm">
													<h3 className="font-bold text-base text-gray-800">
														Veículo: {busInfo.numeroVeiculo}
													</h3>
													<p>
														<strong>Velocidade:</strong> {busInfo.velocidade} km/h
													</p>
													<p>
														<strong>Última atualização:</strong>{" "}
														{busInfo.horarioFormatado}
													</p>
												</div>
											</Popup>
										</Marker>
									);
								}
							})}
						<InnerMapControls />
					</MapContainer>
				</div>
			)}
		</div>
	);
}
