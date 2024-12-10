import Cardonibus from "@/components/cardonibus";
import { Input } from "@/components/ui/input";
import { useLinha } from "@/hooks/useLinha";
import type { Linha } from "@/types/linha";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { linhas, isLoading, isError } = useLinha();
	const [linhasFiltradas, setLinhasFiltradas] = useState<Linha[]>([]);

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nomeLinha = event.target.value;
		const filtrados: Linha[] = linhas?.data?.filter((l) => l.linha.includes(nomeLinha)) || [];

		nomeLinha === null ? setLinhasFiltradas([]) : setLinhasFiltradas(filtrados);
	};

	return (
		<div className="p-5 shadow-md rounded-md flex flex-col items-center">
			<Input type="text" placeholder="Procurar linha" className="max-w-md" onChange={(e) => handleFilter(e)} />
			<section className="flex gap-4 flex-wrap my-4 justify-center">
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
				{isLoading && (
					<section>
						<svg
							aria-hidden="true"
							className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
						<span className="sr-only">Loading...</span>
					</section>
				)}
				{isError && (
					<section className="bg-white dark:bg-gray-900">
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
	);
}
