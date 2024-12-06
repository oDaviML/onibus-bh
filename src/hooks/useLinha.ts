import { getAllLinhas } from "@/api/linhasService";
import { useQuery } from "@tanstack/react-query";

export const useLinha = () => {
	const query = useQuery({
		queryKey: ["linhas"],
		queryFn: getAllLinhas,
	});

	return {
		...query,
		linhas: query.data?.data,
	};
};
