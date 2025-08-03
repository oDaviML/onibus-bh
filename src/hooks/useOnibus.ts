import { getAllOnibus, getOnibusByLinha } from "@/api/onibusService";
import { useQuery } from "@tanstack/react-query";

export const useOnibus = () => {
	const query = useQuery({
		queryKey: ["listaOnibus"],
		queryFn: getAllOnibus,
	});

	return {
		...query,
		onibus: query?.data,
	};
};

export const useOnibusByLinha = (numeroLinha: number, sentido: number) => {
	const query = useQuery({
		queryKey: ["listaOnibusLinha", numeroLinha, sentido],
		queryFn: () => getOnibusByLinha(numeroLinha, sentido),
		enabled: !!numeroLinha,
		refetchInterval: 10000,
		staleTime: 5000,
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});

	return {
		...query,
		onibus: query.data?.data,
	};
};
