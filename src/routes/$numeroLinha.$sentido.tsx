import { createFileRoute } from "@tanstack/react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../index.css";

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
				<h1 className="text-xl font-bold">{linha?.data.linha}</h1>
				<h2 className="text-lg font-light">{sentidoNumber === 1 ? "Ida" : "Volta"}</h2>
				<h3 className="text-sm text-center font-light">Ultima atualizacao: {new Date().toLocaleString()}</h3>
			</header>
			{isError && (
				<section className="bg-white dark:bg-gray-900">
					<div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
						<div className="mx-auto max-w-screen-sm text-center">
							<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
								500
							</h1>
							<p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
								Falha ao carregar as coordenadas.
							</p>
							<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
								Ocorreu um erro ao carregar as coordenadas, por favor tente novamente.
							</p>
						</div>
					</div>
				</section>
			)}
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
