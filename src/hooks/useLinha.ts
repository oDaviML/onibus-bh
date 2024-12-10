import { getAllLinhas, getLinhaByNumeroLinha } from "@/api/linhasService";
import { useQuery } from "@tanstack/react-query";

export const useLinha = (filtarLinhas: boolean) => {
	const query = useQuery({
		queryKey: ["listaLinhas"],
		queryFn: () => getAllLinhas(filtarLinhas),
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
