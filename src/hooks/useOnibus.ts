import { getAllOnibus } from "@/api/onibusService";
import { useQuery } from "@tanstack/react-query";

export const useOnibus = () => {
	const { data: onibus } = useQuery({
		queryKey: ["onibus"],
		queryFn: getAllOnibus,
	});

	return {
		...onibus,
		onibus: onibus?.data,
	};
};
