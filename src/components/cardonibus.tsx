import type { Linha } from "@/types/linha";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type CardonibusProps = {
	linha: Linha;
	isFavorite: boolean;
	toggleFavorite: () => void;
	onNavigate?: () => void;
};

export default function Cardonibus({ linha, isFavorite, toggleFavorite, onNavigate }: CardonibusProps) {
	const allowedPaths = {
		ida: `/${linha.numeroLinha}/1`,
		volta: `/${linha.numeroLinha}/2`,
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 relative w-full max-w-sm hover:cursor-pointer">
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							toggleFavorite();
						}}
						className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
						aria-label="Toggle Favorite"
					>
						<Star
							className={`w-5 h-5 transition-colors ${
								isFavorite ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
							}`}
						/>
					</button>
					<CardHeader className="pb-4">
						<CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 pr-8">{linha.linha}</CardTitle>
						<CardDescription className="text-sm text-slate-600 dark:text-slate-400 mt-1 break-words line-clamp-2">
							{linha.nome}
						</CardDescription>
					</CardHeader>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">{linha.linha}</DialogTitle>
					<DialogDescription>
						Escolha entre as opções para definir o ponto de partida ou o destino.
					</DialogDescription>
				</DialogHeader>
				<div className="flex gap-4 flex-wrap justify-center">
					{linha.sentidoIsUnique ? (
						<Link 
							to={allowedPaths.ida}
							onClick={onNavigate}
						>
							<Card className="w-[200px] h-[200px] flex items-center justify-center hover:scale-105 hover:shadow-lg transition-all">
								<CardHeader>
									<CardTitle>Unidirecional</CardTitle>
								</CardHeader>
							</Card>
						</Link>
					) : (
						<>
							<Link 
								to={allowedPaths.ida}
								onClick={onNavigate}
							>
								<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all w-[200px] h-[200px] flex items-center justify-center">
									<CardHeader>
										<CardTitle>Ida</CardTitle>
									</CardHeader>
								</Card>
							</Link>
							<Link 
								to={allowedPaths.volta}
								onClick={onNavigate}
							>
								<Card className="hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-all w-[200px] h-[200px] flex items-center justify-center">
									<CardHeader>
										<CardTitle>Volta</CardTitle>
									</CardHeader>
								</Card>
							</Link>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
