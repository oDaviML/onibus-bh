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

export const useOnibusByLinha = (numeroLinha: number) => {
	const query = useQuery({
		queryKey: ["listaOnibusLinha", numeroLinha],
		queryFn: () => getOnibusByLinha(numeroLinha),
		enabled: !!numeroLinha,
		refetchInterval: 20000,
	});

	return {
		...query,
		onibus: query.data?.data,
	};
};
