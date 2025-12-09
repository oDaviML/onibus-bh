import { useLinhaByNumeroLinha } from "@/hooks/useLinha";
import useLocation from "@/hooks/useLocation";
import { useOnibusByLinha } from "@/hooks/useOnibus";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { LatLngBoundsExpression } from "leaflet";

interface LeafletMap {
	flyTo: (latlng: [number, number], zoom: number) => void;
	fitBounds: (bounds: LatLngBoundsExpression, options?: { padding: [number, number] }) => void;
}

interface UseCoordendasProps {
	numeroLinha: string;
	sentido: string;
}

function formatTimeAgo(timestamp: number) {
	const now = Date.now();
	const seconds = Math.floor((now - timestamp) / 1000);

	if (seconds < 5) return "agora";
	if (seconds < 60) return `há ${seconds} segundos`;
	if (seconds < 120) return "há um minuto";
	const minutes = Math.floor(seconds / 60);
	return `há ${minutes} minutos`;
}

function formatBusTime(horario: string) {
	if (!horario) return "N/A";

	try {
		const [datePart, timePart] = horario.split(" ");
		const [day, month, year] = datePart.split("-");
		const timeWithMs = timePart.replace(/:/g, ":").split(":");
		const [hours, minutes, seconds, milliseconds] = timeWithMs;

		const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds || "000"}`;
		const busTime = new Date(isoString);

		if (Number.isNaN(busTime.getTime())) {
			return "N/A";
		}

		const now = new Date();
		const diffMs = now.getTime() - busTime.getTime();
		const diffSeconds = Math.floor(diffMs / 1000);
		const diffMinutes = Math.floor(diffSeconds / 60);
		const diffHours = Math.floor(diffMinutes / 60);

		if (diffSeconds < 5) return "agora";
		if (diffSeconds < 60) return `há ${diffSeconds} segundos`;
		if (diffMinutes < 60) return `há ${diffMinutes} minutos`;
		if (diffHours < 24) return `há ${diffHours} horas`;

		return busTime.toLocaleTimeString("pt-BR");
	} catch (error) {
		console.error("Error parsing bus time:", error);
		return "N/A";
	}
}

export function useCoordenadas({ numeroLinha, sentido }: UseCoordendasProps) {
	const numeroLinhaNumber = Number.parseInt(numeroLinha, 10);
	const sentidoNumber = Number.parseInt(sentido, 10);

	const { onibus, isError, isLoading, lastUpdated, refetch } = useOnibusByLinha(numeroLinhaNumber, sentidoNumber);
	const { linha } = useLinhaByNumeroLinha(numeroLinhaNumber);
	const { location, loading } = useLocation();
	const [timeAgo, setTimeAgo] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (lastUpdated) {
			setTimeAgo(formatTimeAgo(lastUpdated));
			const interval = setInterval(() => {
				setTimeAgo(formatTimeAgo(lastUpdated));
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [lastUpdated]);

	const handleSentidoChange = (value: string) => {
		if (value) {
			navigate({ to: "/$numeroLinha/$sentido", params: { numeroLinha, sentido: value } });
		}
	};

	const createMapActions = () => ({
		centerOnUser: (map: LeafletMap) => {
			if (location) {
				map.flyTo([location.latitude, location.longitude], 16);
			}
		},
		fitAllBuses: (map: LeafletMap) => {
			if (onibus?.data && onibus.data.length > 0) {
				const bounds = onibus.data.map((bus) => [bus.latitude, bus.longitude]) as LatLngBoundsExpression;
				map.fitBounds(bounds, { padding: [50, 50] });
			}
		},
	});

	const getBusPopupContent = (bus: { numeroVeiculo: number; velocidade: number; horario: string }) => ({
		numeroVeiculo: bus.numeroVeiculo.toString(),
		velocidade: bus.velocidade,
		horarioFormatado: formatBusTime(bus.horario),
	});

	const mapActions = createMapActions();

	return {
		// Data
		onibus,
		linha,
		location,
		timeAgo,
		numeroLinhaNumber,
		sentidoNumber,

		// States
		isError,
		isLoading,
		loading,

		// Actions
		handleSentidoChange,
		refetch,
		...mapActions,
		getBusPopupContent,

		// Utils
		formatBusTime,
		sentido,
		numeroLinha,
	};
}
