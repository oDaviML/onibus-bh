import type { Linha } from "@/types/linha";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

function click(linha: Linha) {
	console.log(linha.numeroLinha);
}

export default function Cardonibus({ linha }: { linha: Linha }) {
	return (
		<Card
			className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all"
			onClick={() => click(linha)}
		>
			<CardHeader>
				<CardTitle>1502</CardTitle>
				<CardDescription>Vista Alegre - Guarani</CardDescription>
			</CardHeader>
		</Card>
	);
}
