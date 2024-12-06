import type { Linha } from "@/types/linha";
import { Link } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Cardonibus({ linha }: { linha: Linha }) {
	return (
		<Link
			to={`/coordenadas/${linha.numeroLinha}`}
			className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all min-w-full sm:min-w-[300px]"
		>
			<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all min-w-full sm:min-w-[300px]">
				<CardHeader>
					<CardTitle>{linha.linha}</CardTitle>
					<CardDescription>{linha.nome}</CardDescription>
				</CardHeader>
			</Card>
		</Link>
	);
}
