import { createFileRoute } from "@tanstack/react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../index.css";
import { useLinhaByNumeroLinha } from "@/hooks/useLinha";
import { useOnibusByLinha } from "@/hooks/useOnibus";
import L from "leaflet";
import { useEffect, useState } from "react";
import iconeOnibusURL from "../assets/marcador_onibus.png";

export const Route = createFileRoute("/coordenadas/$numeroLinha")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { numeroLinha } = params;
		return { numeroLinha };
	},
});

const defaultLocation = {
	latitude: -19.9191248,
	longitude: -43.941204,
};

const iconeOnibus = L.icon({
	iconUrl: iconeOnibusURL,
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

function RouteComponent() {
	const { numeroLinha } = Route.useParams();
	const numeroLinhaNumber = Number.parseInt(numeroLinha, 10);

	const [location, setLocation] = useState(defaultLocation);
	const [isLoading, setIsLoading] = useState(true);

	const { onibus, isError } = useOnibusByLinha(numeroLinhaNumber);
	const { linha } = useLinhaByNumeroLinha(numeroLinhaNumber);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					setIsLoading(false);
				},
				() => {
					console.log("Não foi possível obter a localização do usuário");
					setLocation(defaultLocation);
					setIsLoading(false);
				},
			);
		}
	}, []);

	return (
		<div className="p-2 shadow-md rounded-md flex flex-col items-center">
			<header className="flex flex-col items-center gap-2 my-4">
				<h1 className="text-3xl font-extrabold">Onibus BH</h1>
				<h1 className="text-xl font-bold">{linha?.data.linha}</h1>
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
			{isLoading && (
				<section>
					<svg
						aria-hidden="true"
						className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
				</section>
			)}
			{!isError && !isLoading && (
				<MapContainer center={[location.latitude, location.longitude]} zoom={16}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[location.latitude, location.longitude]} />
					{onibus?.data.map((onibus) => {
						if (onibus.sentido != null || Number(onibus.sentido) !== 3) {
							console.log(onibus);

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
