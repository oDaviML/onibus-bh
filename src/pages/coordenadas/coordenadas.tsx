import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/index.css";

import ServerError from "@/components/serverError";
import Spinner from "@/components/spinner";
import { useLinhaByNumeroLinha } from "@/hooks/useLinha";
import useLocation from "@/hooks/useLocation";
import { useOnibusByLinha } from "@/hooks/useOnibus";
import { iconeOnibus } from "@/types/iconeOnibus";
import { locationIcon } from "@/types/locationIcon";
import {} from "react";

type CoordenadasProps = {
	numeroLinha: string;
	sentido: string;
};

export default function Coordenadas({ numeroLinha, sentido }: CoordenadasProps) {
	const numeroLinhaNumber = Number.parseInt(numeroLinha, 10);
	const sentidoNumber = Number.parseInt(sentido, 10);

	const { onibus, isError, isLoading } = useOnibusByLinha(numeroLinhaNumber, sentidoNumber);
	const { linha } = useLinhaByNumeroLinha(numeroLinhaNumber);
	const { location, loading } = useLocation();

	return (
		<div className="p-2 shadow-md rounded-md flex flex-col items-center border-dashed border-2 border-gray-600">
			<header className="flex flex-col items-center gap-2 my-4">
				<h1 className="text-xl font-bold text-center">
					{linha?.data.linha} -{" "}
					<span className="text-lg font-light">{sentidoNumber === 1 ? "Ida/Unidirecional" : "Volta"}</span>
				</h1>
				<h3 className="text-sm text-center font-light">Ultima atualizacao: {new Date().toLocaleString()}</h3>
			</header>
			
			{isError && <ServerError />}
			
			{/* Mostra spinner apenas quando AMBOS estão carregando */}
			{(isLoading || loading) && <Spinner />}
			
			{/* Renderiza o mapa quando pelo menos a localização está pronta, mesmo se os ônibus ainda estão carregando */}
			{!isError && !loading && (
				<>
					{isLoading && (
						<div className="mb-4 text-center text-sm text-gray-600">
							Carregando informações dos ônibus...
						</div>
					)}
					<MapContainer 
						center={[location.latitude, location.longitude]} 
						zoom={16}
						style={{ height: '500px', width: '100%' }}
						key={`${location.latitude}-${location.longitude}`} // Force re-render quando localização muda
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							maxZoom={19}
							minZoom={10}
							// Configurações para melhor performance
							updateWhenIdle={false}
							updateWhenZooming={false}
							keepBuffer={2}
						/>
						<Marker position={[location.latitude, location.longitude]} icon={locationIcon} />
						{!isLoading && onibus?.data.map((onibus) => {
							if (onibus.sentido != null || Number(onibus.sentido) !== 3) {
								return (
									<Marker
										key={onibus.numeroVeiculo}
										position={[onibus.latitude, onibus.longitude]}
										icon={iconeOnibus}
									>
										<Popup className="p-4">
											<div className="flex flex-col">
												<h3 className="font-bold text-lg text-gray-800 mb-2">{onibus.numeroVeiculo}</h3>
												<div className="text-gray-700">
													<p className="mb-1">
														<span className="font-medium">Velocidade:</span> {onibus.velocidade} km/h
													</p>
													<p>
														<span className="font-medium">Sentido:</span>{" "}
														{Number(onibus.sentido) === 1 ? "Ida/Unidirecional" : "Volta"}
													</p>
													<p>
														{onibus.horario != null && (
															<>
																<span className="font-medium">Última atualização:</span>{" "}
																{onibus.horario.split(' ')[1].split(':').slice(0, 3).join(':')}
															</>
														)}
													</p>
												</div>
											</div>
										</Popup>
									</Marker>
								);
							}
						})}
					</MapContainer>
				</>
			)}
		</div>
	);
}
