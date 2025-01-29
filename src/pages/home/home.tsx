import ServerError from "@/components/ServerError";
import Cardonibus from "@/components/cardonibus";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { useLinha } from "@/hooks/useLinha";
import { useLinhasFavoritas } from "@/hooks/useLinhasFavoritas";
import type { Linha } from "@/types/linha";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
	const [filtarLinhas] = useState<boolean>(true);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const { linhas, isLoading, isError } = useLinha(filtarLinhas);
	const [linhasFiltradas, setLinhasFiltradas] = useState<Linha[]>([]);
	const { linhasFavoritas, toggleFavorito, isFavorita } = useLinhasFavoritas();

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nomeLinha = event.target.value;
		setSearchTerm(nomeLinha);
		const filtrados: Linha[] =
			linhas?.data?.filter((l) => l.linha.toLowerCase().includes(nomeLinha.toLowerCase())) || [];
		setLinhasFiltradas(filtrados);
	};

	const renderLinhas = () => {
		if (isLoading) return <Spinner className="col-span-2" />;
		if (isError) return <ServerError />;

		const linhasParaExibir = searchTerm ? linhasFiltradas : linhas?.data || [];

		if (searchTerm && linhasFiltradas.length === 0) {
			return (
				<div className="col-span-2 text-center py-8">
					<p className="text-gray-600 text-lg">Nenhuma linha encontrada para "{searchTerm}"</p>
				</div>
			);
		}

		return linhasParaExibir.map((linha) => (
			<Cardonibus
				linha={linha}
				isFavorite={isFavorita(linha.numeroLinha)}
				toggleFavorite={() => toggleFavorito(linha)}
				key={linha.numeroLinha}
			/>
		));
	};

	return (
		<section className="flex flex-col gap-4 items-center">
			<header className="w-full max-w-lg p-5">
				<div className="w-full max-w-md mx-auto relative shadow-lg rounded-lg bg-white">
					<div className="relative">
						<Input
							type="text"
							placeholder="Procurar linha"
							className="pl-10 pr-4 py-2 w-full rounded-lg"
							onChange={handleFilter}
							value={searchTerm}
						/>
						<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
							<Search className="h-4 w-4 text-gray-400" />
						</div>
					</div>
				</div>
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
				<section className="grid grid-cols-2 md:flex gap-4 flex-wrap my-4 justify-center">{renderLinhas()}</section>
			</div>
		</section>
	);
}
