import { useLinhasFavoritas } from "@/hooks/useLinhasFavoritas";
import { Link } from "@tanstack/react-router";
import { Star, StarOff } from "lucide-react";
import { useState } from "react";
import onibusImage from "../assets/onibus.png";
import Cardonibus from "./cardonibus";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function NavBar() {
	const { linhasFavoritas, toggleFavorito, isFavorita } = useLinhasFavoritas();
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	return (
		<nav className="bg-gray-800 sticky top-0 z-50">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<Link to="/" className="flex shrink-0 items-center">
							<img alt="Onibus" src={onibusImage} className="h-10 w-auto" />
							<span className="text-white font text-2xl font-bold ml-2">Ônibus BH</span>
						</Link>
						<div className="ml-6 flex items-center">
							<div className="flex space-x-4">
								<Link
									to="/"
									className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
									activeProps={{ className: "bg-gray-900 text-white" }}
								>
									Linhas
								</Link>
							</div>
						</div>
					</div>

					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
							<SheetTrigger asChild>
								<Button 
									variant="ghost" 
									size="icon"
									className="rounded-full text-gray-300 hover:text-white hover:bg-gray-700"
								>
									<Star className="h-6 w-6" />
								</Button>
							</SheetTrigger>
							<SheetContent className="w-full sm:max-w-md p-4 overflow-y-auto">
								<SheetHeader>
									<SheetTitle className="text-2xl">Linhas Favoritas</SheetTitle>
									<SheetDescription>
										Acesse rapidamente as linhas que você mais usa.
									</SheetDescription>
								</SheetHeader>
								<div className="mt-6">
									{linhasFavoritas.length > 0 ? (
										<div className="flex flex-col gap-4">
											{linhasFavoritas.map((linha) => (
												<Cardonibus
													linha={linha}
													isFavorite={isFavorita(linha.numeroLinha)}
													toggleFavorite={() => toggleFavorito(linha)}
													onNavigate={handleCloseSheet}
													key={linha.numeroLinha}
												/>
											))}
										</div>
									) : (
										<div className="flex flex-col items-center justify-center text-center py-10">
											<StarOff className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
											<p className="text-lg font-medium">Nenhuma linha favorita.</p>
											<p className="text-sm text-gray-500">
												Adicione linhas aos favoritos para vê-las aqui.
											</p>
										</div>
									)}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	);
}
