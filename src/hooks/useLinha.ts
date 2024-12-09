import { getAllLinhas, getLinhaByNumeroLinha } from "@/api/linhasService";
import { useQuery } from "@tanstack/react-query";

export const useLinha = () => {
	const query = useQuery({
		queryKey: ["listaLinhas"],
		queryFn: getAllLinhas,
	});

	return {
		...query,
		linhas: query.data?.data,
	};
};

export const useLinhaByNumeroLinha = (numeroLinha: number) => {
	const query = useQuery({
		queryKey: ["linha", numeroLinha],
		queryFn: () => getLinhaByNumeroLinha(numeroLinha),
		enabled: !!numeroLinha,
	});

	return {
		...query,
		linha: query.data?.data,
	};
};
