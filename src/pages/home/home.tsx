import Cardonibus from "@/components/cardonibus";
import ServerError from "@/components/serverError";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useLinha } from "@/hooks/useLinha";
import { useLinhasFavoritas } from "@/hooks/useLinhasFavoritas";
import { usePagination } from "@/hooks/usePagination";
import { useLinhaSearch } from "@/hooks/useLinhaSearch";
import { Search, StarOff, Star } from "lucide-react";

export default function Home() {
	const { linhas, isLoading, isError } = useLinha(true);
	const { linhasFavoritas, toggleFavorito, isFavorita } = useLinhasFavoritas();
	const { 
		searchTerm, 
		linhasFiltradas, 
		handleSearchChange, 
		isSearching 
	} = useLinhaSearch(linhas?.data);

	const linhasParaExibir = isSearching ? linhasFiltradas : linhas?.data || [];
	const ITEMS_PER_PAGE = 12;
	
	const {
		currentPage,
		totalPages,
		paginatedData,
		goToPage,
		goToNextPage,
		goToPreviousPage,
		resetPagination,
		hasNextPage,
		hasPreviousPage,
	} = usePagination({
		data: linhasParaExibir,
		itemsPerPage: ITEMS_PER_PAGE,
	});

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nomeLinha = event.target.value;
		handleSearchChange(nomeLinha);
		resetPagination(); // Reset to first page when filtering
	};

	const renderLinhas = () => {
		if (isLoading) return <div className="col-span-full flex justify-center"><Spinner /></div>;
		if (isError) return <div className="col-span-full"><ServerError /></div>;

		if (isSearching && linhasFiltradas.length === 0) {
			return (
				<div className="col-span-full text-center py-8">
					<p className="text-gray-600 text-lg">Nenhuma linha encontrada para "{searchTerm}"</p>
				</div>
			);
		}

		return paginatedData.map((linha) => (
			<Cardonibus
				linha={linha}
				isFavorite={isFavorita(linha.numeroLinha)}
				toggleFavorite={() => toggleFavorito(linha)}
				key={linha.numeroLinha}
			/>
		));
	};

	const renderPagination = () => {
		if (totalPages <= 1) return null;

		const getVisiblePages = () => {
			const pages = [];
			const maxVisible = 5;
			let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
			const end = Math.min(totalPages, start + maxVisible - 1);
			
			if (end - start + 1 < maxVisible) {
				start = Math.max(1, end - maxVisible + 1);
			}

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
			return pages;
		};

		return (
			<Pagination className="mt-6">
				<PaginationContent>
					{hasPreviousPage && (
						<PaginationItem>
							<PaginationPrevious 
								href="#"
								onClick={(e) => {
									e.preventDefault();
									goToPreviousPage();
								}}
								className="cursor-pointer"
							/>
						</PaginationItem>
					)}
					
					{getVisiblePages().map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								href="#"
								isActive={currentPage === page}
								onClick={(e) => {
									e.preventDefault();
									goToPage(page);
								}}
								className="cursor-pointer"
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}
					
					{hasNextPage && (
						<PaginationItem>
							<PaginationNext 
								href="#"
								onClick={(e) => {
									e.preventDefault();
									goToNextPage();
								}}
								className="cursor-pointer"
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		);
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

			{!isSearching &&
				(linhasFavoritas.length > 0 ? (
					<div className="container max-w-6xl mx-auto p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 border-l-4 border-l-blue-700 border border-gray-200 dark:border-gray-700">
						<h2 className="text-2xl font-bold text-center mb-6 text-blue-900 dark:text-blue-300 flex items-center justify-center gap-2">
							<Star className="w-6 h-6 text-blue-700 fill-blue-700" />
							Suas Linhas Favoritas
						</h2>
						<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
				) : (
					<div className="container max-w-4xl mx-auto p-8 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
						<StarOff className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
						<h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
							Nenhuma linha favorita ainda.
						</h2>
						<p className="text-gray-500 dark:text-gray-400 mt-2">
							Clique na estrela de uma linha para adicioná-la aqui e acessá-la rapidamente.
						</p>
					</div>
				))}

			<div className="container max-w-6xl mx-auto p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 border-l-4 border-l-gray-500 border border-gray-200 dark:border-gray-700">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-700 dark:text-gray-300">Todas as Linhas</h2>
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{renderLinhas()}
				</section>
				{renderPagination()}
			</div>
		</section>
	);
}
