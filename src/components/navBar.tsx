import { useLinhasFavoritas } from "@/hooks/useLinhasFavoritas";
import { Link } from "@tanstack/react-router";
import { Star, StarOff } from "lucide-react";
import { useState } from "react";
import Cardonibus from "./cardonibus";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ModeToggle } from "./mode-toggle";

export default function NavBar() {
	const { linhasFavoritas, toggleFavorito, isFavorita } = useLinhasFavoritas();
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	return (
		<div className="flex items-center justify-between mb-12 animate-fade-in w-full">
			<div className="flex flex-col">
				<Link to="/" className="text-4xl font-bold text-stone-800 dark:text-stone-100 tracking-tight flex items-center gap-2">
					<span className="text-sky-600 dark:text-sky-400">ônibus</span>
					<span className="text-stone-600 dark:text-stone-400">BH</span>
				</Link>
				<p className="text-stone-500 dark:text-stone-500 font-medium mt-2 text-lg hidden sm:block">
					Mobilidade urbana simplificada
				</p>
			</div>

			<div className="flex items-center gap-2">
				<ModeToggle />
				<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
					<SheetTrigger asChild>
						<button 
							className="p-3 rounded-xl bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-700 hover:border-sky-300 dark:hover:border-sky-700 text-stone-600 dark:text-stone-300 transition-all hover:scale-105 active:scale-95 shadow-sm"
							aria-label="Linhas Favoritas"
						>
							<Star size={22} className={linhasFavoritas.length > 0 ? "fill-yellow-400 text-yellow-400" : ""} />
						</button>
					</SheetTrigger>
					<SheetContent className="w-full sm:max-w-md p-4 overflow-y-auto bg-stone-50 dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800">
						<SheetHeader className="text-left mb-6">
							<SheetTitle className="text-2xl font-bold text-stone-800 dark:text-stone-100">Linhas Favoritas</SheetTitle>
							<SheetDescription className="text-stone-500 dark:text-stone-400">
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
									<StarOff className="w-16 h-16 text-stone-300 dark:text-stone-700 mb-4" />
									<p className="text-lg font-medium text-stone-600 dark:text-stone-300">Nenhuma linha favorita.</p>
									<p className="text-sm text-stone-400 dark:text-stone-500">
										Adicione linhas aos favoritos para vê-las aqui.
									</p>
								</div>
							)}
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
