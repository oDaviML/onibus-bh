import Cardonibus from "@/components/cardonibus";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { useLinha } from "@/hooks/useLinha";
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
			<div className="container p-5 shadow-md rounded-md flex flex-col items-center w-full border-dashed border-2 border-gray-600">
				<section className="grid grid-cols-2 md:flex gap-4 flex-wrap my-4 justify-center">
					{!isLoading &&
						linhasFiltradas.length === 0 &&
						linhas?.data.map((linha) => (
							<Cardonibus
								linha={{ numeroLinha: linha.numeroLinha, nome: linha.nome, linha: linha.linha }}
								key={linha.numeroLinha}
							/>
						))}
					{!isLoading &&
						linhasFiltradas.length !== 0 &&
						linhasFiltradas.map((linha) => (
							<Cardonibus
								linha={{ numeroLinha: linha.numeroLinha, nome: linha.nome, linha: linha.linha }}
								key={linha.numeroLinha}
							/>
						))}
					{isLoading && <Spinner className="col-span-2" />}
					{isError && (
						<section className="bg-white dark:bg-gray-900 col-span-2">
							<div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
								<div className="mx-auto max-w-screen-sm text-center">
									<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
										500
									</h1>
									<p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
										Falha ao carregar linhas.
									</p>
									<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
										Ocorreu um erro ao carregar as linhas, por favor tente novamente.
									</p>
								</div>
							</div>
						</section>
					)}
				</section>
			</div>
		</section>
	);
}
