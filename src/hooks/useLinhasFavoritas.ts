import { useContext } from "react";
import { LinhasFavoritasContext } from "@/contexts/LinhasFavoritasContext";

export function useLinhasFavoritas() {
	const context = useContext(LinhasFavoritasContext);
	if (context === undefined) {
		throw new Error("useLinhasFavoritas must be used within a LinhasFavoritasProvider");
	}
	return context;
}
