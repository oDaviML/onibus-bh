import type { Linha } from "@/types/linha";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface LinhasFavoritasContextType {
	linhasFavoritas: Linha[];
	toggleFavorito: (linha: Linha) => void;
	isFavorita: (numeroLinha: number) => boolean;
	isLoaded: boolean;
}

const LinhasFavoritasContext = createContext<LinhasFavoritasContextType | undefined>(undefined);

export { LinhasFavoritasContext };

interface LinhasFavoritasProviderProps {
	children: ReactNode;
}

export function LinhasFavoritasProvider({ children }: LinhasFavoritasProviderProps) {
	const [linhasFavoritas, setLinhasFavoritas] = useState<Linha[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// Carregar favoritos do localStorage na inicialização
	useEffect(() => {
		const favoritosSalvos = localStorage.getItem("linhasFavoritas");
		if (favoritosSalvos) {
			try {
				const parsed = JSON.parse(favoritosSalvos);
				setLinhasFavoritas(Array.isArray(parsed) ? parsed : []);
			} catch (error) {
				console.error("Erro ao carregar favoritos:", error);
				setLinhasFavoritas([]);
			}
		}
		setIsLoaded(true);
	}, []);

	// Salvar favoritos no localStorage sempre que o estado mudar
	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem("linhasFavoritas", JSON.stringify(linhasFavoritas));
		}
	}, [linhasFavoritas, isLoaded]);

	const toggleFavorito = (linha: Linha) => {
		setLinhasFavoritas(prev => {
			const jaFavorita = prev.some((fav) => fav.numeroLinha === linha.numeroLinha);
			
			if (jaFavorita) {
				return prev.filter((fav) => fav.numeroLinha !== linha.numeroLinha);
			}
			
			return [...prev, linha];
		});
	};

	const isFavorita = (numeroLinha: number) => {
		return linhasFavoritas.some((fav) => fav.numeroLinha === numeroLinha);
	};

	const value: LinhasFavoritasContextType = {
		linhasFavoritas,
		toggleFavorito,
		isFavorita,
		isLoaded,
	};

	return (
		<LinhasFavoritasContext.Provider value={value}>
			{children}
		</LinhasFavoritasContext.Provider>
	);
}
