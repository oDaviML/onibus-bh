import type { Linha } from "@/types/linha";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

function click(linha: Linha) {
	console.log(linha.numeroLinha);
}

export default function Cardonibus({ linha }: { linha: Linha }) {
	return (
		<Card
			className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all min-w-full sm:min-w-[300px]"
			onClick={() => click(linha)}
		>
			<CardHeader>
				<CardTitle>{linha.linha}</CardTitle>
				<CardDescription>{linha.nome}</CardDescription>
			</CardHeader>
		</Card>
	);
}
