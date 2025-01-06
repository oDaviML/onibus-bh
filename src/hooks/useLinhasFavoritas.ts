import type { Linha } from "@/types/linha";
import { useEffect, useState } from "react";

export function useLinhasFavoritas() {
	const [linhasFavoritas, setLinhasFavoritas] = useState<Linha[]>([]);

	useEffect(() => {
		const favoritosSalvos = localStorage.getItem("linhasFavoritas");
		if (favoritosSalvos) {
			setLinhasFavoritas(JSON.parse(favoritosSalvos));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("linhasFavoritas", JSON.stringify(linhasFavoritas));
	}, [linhasFavoritas]);

	const toggleFavorito = (linha: Linha) => {
		const jaFavorita = linhasFavoritas.some((fav) => fav.numeroLinha === linha.numeroLinha);

		if (jaFavorita) {
			setLinhasFavoritas(linhasFavoritas.filter((fav) => fav.numeroLinha !== linha.numeroLinha));
		} else {
			setLinhasFavoritas([...linhasFavoritas, linha]);
		}
	};

	const isFavorita = (numeroLinha: number) => linhasFavoritas.some((fav) => fav.numeroLinha === numeroLinha);

	return {
		linhasFavoritas,
		toggleFavorito,
		isFavorita,
	};
}
