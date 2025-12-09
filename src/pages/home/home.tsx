import { Bus, Search, Star } from "lucide-react";
import type React from "react";
import Cardonibus from "@/components/cardonibus";
import NavBar from "@/components/navBar";
import ServerError from "@/components/serverError";
import Spinner from "@/components/spinner";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useLinha } from "@/hooks/useLinha";
import { useLinhaSearch } from "@/hooks/useLinhaSearch";
import { useLinhasFavoritas } from "@/hooks/useLinhasFavoritas";
import { usePagination } from "@/hooks/usePagination";

export default function Home() {
	const { linhas, isLoading, isError } = useLinha(true);
	const { linhasFavoritas, toggleFavorito, isFavorita } = useLinhasFavoritas();
	const { searchTerm, linhasFiltradas, handleSearchChange, isSearching } = useLinhaSearch(linhas?.data);

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
		resetPagination();
	};

	const renderLinhas = () => {
		if (isLoading)
			return (
				<div className="col-span-full flex justify-center py-20">
					<Spinner />
				</div>
			);
		if (isError)
			return (
				<div className="col-span-full">
					<ServerError />
				</div>
			);

		if (isSearching && linhasFiltradas.length === 0) {
			return (
				<div className="col-span-1 md:col-span-2 text-center py-20">
					<div className="w-20 h-20 bg-stone-100 dark:bg-stone-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-200 dark:border-stone-700">
						<Bus className="w-8 h-8 text-stone-400" />
					</div>
					<h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">Nenhuma linha encontrada</h3>
					<p className="text-stone-500 dark:text-stone-500 max-w-xs mx-auto">Tente buscar por outro número ou nome.</p>
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
			<Pagination className="mt-8">
				<PaginationContent>
					{hasPreviousPage && (
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault();
									goToPreviousPage();
								}}
								className="cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
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
								className={`cursor-pointer ${
									currentPage === page
										? "bg-sky-500 text-white border-sky-500 hover:bg-sky-600 hover:text-white"
										: "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
								}`}
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
								className="cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		);
	};

	return (
		<div className="min-h-screen transition-colors duration-300">
			<div className="max-w-4xl mx-auto w-full px-6 py-10">
				<NavBar />

				{/* Search Bar */}
				<div className="sticky top-6 z-20 mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
					<div className="relative group">
						<div className="relative bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md flex items-center border border-stone-200 dark:border-stone-700 focus-within:border-sky-400 dark:focus-within:border-sky-600 transition-all">
							<div className="pl-6 text-stone-400">
								<Search className="h-6 w-6" />
							</div>
							<input
								type="text"
								className="w-full bg-transparent py-5 px-4 text-lg text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
								placeholder="Qual linha você procura?"
								value={searchTerm}
								onChange={handleFilter}
							/>
							{searchTerm && (
								<button
									type="button"
									onClick={() => {
										handleSearchChange("");
										resetPagination();
									}}
									className="pr-6 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
								>
									<span className="text-sm font-semibold">Limpar</span>
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Favorites Section */}
				{!isSearching && linhasFavoritas.length > 0 && (
					<div className="mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
						<h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-4 flex items-center gap-2">
							<Star className="text-yellow-400 fill-yellow-400" size={20} />
							Suas Favoritas
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{linhasFavoritas.map((linha) => (
								<Cardonibus
									linha={linha}
									isFavorite={isFavorita(linha.numeroLinha)}
									toggleFavorite={() => toggleFavorito(linha)}
									key={linha.numeroLinha}
								/>
							))}
						</div>
					</div>
				)}

				{/* All Lines Section */}
				{!isSearching ? (
					<div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
						<h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-4">Todas as Linhas</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">{renderLinhas()}</div>
						{renderPagination()}
					</div>
				) : (
					<div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">{renderLinhas()}</div>
						{renderPagination()}
					</div>
				)}
			</div>
		</div>
	);
}
