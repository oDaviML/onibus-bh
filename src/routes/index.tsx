import ServerError from "@/components/ServerError";
import Cardonibus from "@/components/cardonibus";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { useLinha } from "@/hooks/useLinha";
import { useLinhasFavoritas } from "@/hooks/useLinhasFavoritas";
import type { Linha } from "@/types/linha";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [filtarLinhas] = useState<boolean>(true);

	const { linhas, isLoading, isError } = useLinha(filtarLinhas);
	const [linhasFiltradas, setLinhasFiltradas] = useState<Linha[]>([]);
	const { linhasFavoritas, toggleFavorito, isFavorita } = useLinhasFavoritas();

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nomeLinha = event.target.value;
		const filtrados: Linha[] = linhas?.data?.filter((l) => l.linha.includes(nomeLinha)) || [];

		setLinhasFiltradas(nomeLinha ? filtrados : []);
	};

	return (
		<section className="flex flex-col gap-4 items-center">
			<header className="p-5 shadow-lg rounded-lg flex flex-col items-center max-w-lg">
				<Input type="text" placeholder="Procurar linha" className="max-w-md" onChange={(e) => handleFilter(e)} />
			</header>

			{linhasFavoritas.length > 0 && (
				<div className="container p-5 shadow-md rounded-md flex flex-col items-center w-full border-dashed border-2 border-gray-600">
					<h1 className="text-2xl font-bold">Linhas favoritas</h1>
					<section className="flex flex-wrap gap-4 my-4 justify-center">
						{linhasFavoritas.map((linha) => (
							<Cardonibus
								linha={linha}
								isFavorite={isFavorita(linha.numeroLinha)}
								toggleFavorite={() => toggleFavorito(linha)}
								key={linha.numeroLinha}
							/>
						))}
					</section>
				</div>
			)}

			<div className="container p-5 shadow-md rounded-md flex flex-col items-center w-full border-dashed border-2 border-gray-600">
				<section className="grid grid-cols-2 md:flex gap-4 flex-wrap my-4 justify-center">
					{!isLoading &&
						linhasFiltradas.length === 0 &&
						linhas?.data.map((linha) => (
							<Cardonibus
								linha={linha}
								isFavorite={isFavorita(linha.numeroLinha)}
								toggleFavorite={() => toggleFavorito(linha)}
								key={linha.numeroLinha}
							/>
						))}
					{!isLoading &&
						linhasFiltradas.length !== 0 &&
						linhasFiltradas.map((linha) => (
							<Cardonibus
								linha={linha}
								isFavorite={isFavorita(linha.numeroLinha)}
								toggleFavorite={() => toggleFavorito(linha)}
								key={linha.numeroLinha}
							/>
						))}
					{isLoading && <Spinner className="col-span-2" />}
					{isError && <ServerError />}
				</section>
			</div>
		</section>
	);
}
