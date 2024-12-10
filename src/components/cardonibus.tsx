import type { Linha } from "@/types/linha";
import { Link } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function Cardonibus({ linha }: { linha: Linha }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all min-w-full sm:min-w-[300px]">
					<CardHeader>
						<CardTitle>{linha.linha}</CardTitle>
						<CardDescription className="font-light">{linha.nome}</CardDescription>
					</CardHeader>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{linha.linha}</DialogTitle>
					<DialogDescription>
						Escolha entre as opções para definir o ponto de partida ou o destino.
					</DialogDescription>
				</DialogHeader>

				<div className="flex gap-4 flex-wrap justify-center">
					<Link to={`/coordenadas/${linha.numeroLinha}`}>
						<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all w-[200px] h-[200px] flex items-center justify-center">
							<CardHeader>
								<CardTitle>Origem</CardTitle>
							</CardHeader>
						</Card>
					</Link>
					<Link to={`/coordenadas/${linha.numeroLinha}`}>
						<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all w-[200px] h-[200px] flex items-center justify-center">
							<CardHeader>
								<CardTitle>Destino</CardTitle>
							</CardHeader>
						</Card>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
}
