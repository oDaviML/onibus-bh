import { createFileRoute } from "@tanstack/react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../index.css";

import ServerError from "@/components/ServerError";
import Spinner from "@/components/spinner";
import { useLinhaByNumeroLinha } from "@/hooks/useLinha";
import useLocation from "@/hooks/useLocation";
import { useOnibusByLinha } from "@/hooks/useOnibus";
import { iconeOnibus } from "@/types/iconeOnibus";
import { locationIcon } from "@/types/locationIcon";
import {} from "react";

export const Route = createFileRoute("/$numeroLinha/$sentido")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const numeroLinha = params.numeroLinha;
		const sentido = params.sentido;
		return { numeroLinha, sentido };
	},
});

function RouteComponent() {
	const { numeroLinha, sentido } = Route.useParams();
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
			{isLoading && loading && <Spinner />}
			{!isError && !loading && !isLoading && (
				<MapContainer center={[location.latitude, location.longitude]} zoom={16}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[location.latitude, location.longitude]} icon={locationIcon} />
					{onibus?.data.map((onibus) => {
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
													{Number(onibus.sentido) === 1 ? "Ida" : "Volta"}
												</p>
											</div>
										</div>
									</Popup>
								</Marker>
							);
						}
					})}
				</MapContainer>
			)}
		</div>
	);
}
