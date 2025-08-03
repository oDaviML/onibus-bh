import { useEffect, useState } from "react";
import { toast } from "./use-toast";

type Location = {
	latitude: number;
	longitude: number;
};

type UseLocationReturn = {
	location: Location;
	error: string | null;
	loading: boolean;
};

const DEFAULT_LOCATION: Location = {
	latitude: -19.9191248,
	longitude: -43.941204,
};

const useLocation = (): UseLocationReturn => {
	const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!navigator.geolocation) {
			const message = "Geolocalização não é suportada pelo seu navegador.";
			setError(message);
			setLocation(DEFAULT_LOCATION);
			setLoading(false);

			toast({
				title: "Erro de Geolocalização",
				description: message,
				variant: "destructive",
			});

			return;
		}

		const options = {
			enableHighAccuracy: false,
			timeout: 10000,
			maximumAge: 300000,
		};

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setLocation({ latitude, longitude });
				setError(null);
				setLoading(false);
			},
			(err) => {
				const message = err.message || "Erro ao obter localização.";
				setError(message);
				setLocation(DEFAULT_LOCATION);
				setLoading(false);

				toast({
					title: "Erro de Geolocalização",
					description: `${message}. Usando localização padrão (Centro de BH).`,
					variant: "destructive",
				});
			},
			options,
		);
	}, []);

	return { location, error, loading };
};

export default useLocation;
