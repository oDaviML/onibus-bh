import { useState, useMemo } from "react";
import type { Linha } from "@/types/linha";

export function useLinhaSearch(linhas: Linha[] | undefined) {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const linhasFiltradas = useMemo(() => {
		if (!searchTerm || !linhas) return linhas || [];
		return linhas.filter((linha) => 
			linha.linha.toLowerCase().includes(searchTerm.toLowerCase()) ||
			linha.nome.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [linhas, searchTerm]);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
	};

	const clearSearch = () => {
		setSearchTerm("");
	};

	return {
		searchTerm,
		linhasFiltradas,
		handleSearchChange,
		clearSearch,
		hasResults: linhasFiltradas.length > 0,
		isSearching: searchTerm.length > 0,
	};
}
