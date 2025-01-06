import type { Linha } from "@/types/linha";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function Cardonibus({
	linha,
	isFavorite,
	toggleFavorite,
}: { linha: Linha; isFavorite: boolean; toggleFavorite: () => void }) {
	const allowedPaths = {
		ida: `/${linha.numeroLinha}/1`,
		volta: `/${linha.numeroLinha}/2`,
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all min-w-full sm:min-w-[300px]">
					<CardHeader>
						<CardTitle className="text-lg sm:text-2xl">{linha.linha}</CardTitle>
						<CardDescription className="font-light">{linha.nome}</CardDescription>
					</CardHeader>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						{linha.linha}
						{isFavorite ? (
							<Heart onClick={toggleFavorite} className="text-red-500 fill-red-500" />
						) : (
							<Heart
								onClick={toggleFavorite}
								className="hover:fill-red-500 hover:text-red-500 transition-colors"
							/>
						)}
					</DialogTitle>
					<DialogDescription>
						Escolha entre as opções para definir o ponto de partida ou o destino.
					</DialogDescription>
				</DialogHeader>

				<div className="flex gap-4 flex-wrap justify-center">
					<Link to={allowedPaths.ida}>
						<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all w-[200px] h-[200px] flex items-center justify-center">
							<CardHeader>
								<CardTitle>Ida</CardTitle>
							</CardHeader>
						</Card>
					</Link>
					<Link to={allowedPaths.volta}>
						<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all w-[200px] h-[200px] flex items-center justify-center">
							<CardHeader>
								<CardTitle>Volta</CardTitle>
							</CardHeader>
						</Card>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
}
