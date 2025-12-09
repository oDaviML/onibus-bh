import type { Linha } from "@/types/linha";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowRightLeft, Map as MapIcon, Star } from "lucide-react";
import { cn, getLineColor } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import { motion } from "framer-motion";

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

	const color = getLineColor(linha.numeroLinha);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}
					type="button"
					className="group relative w-full bg-white/60 dark:bg-stone-900/60 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 hover:border-sky-200 dark:hover:border-sky-800 hover:bg-white dark:hover:bg-stone-900 shadow-sm hover:shadow-md transition-colors flex flex-col items-start justify-between text-left overflow-hidden h-full"
				>
					<div className="flex flex-col items-start gap-4 pl-1 w-full pr-4">
						<div
							className={cn(
								"h-12 px-3 rounded-lg flex-shrink-0 flex items-center justify-center text-lg font-bold shadow-sm",
								color.bg,
								color.text,
							)}
						>
							{linha.linha}
						</div>

						<div className="w-full">
							<h3 className="font-semibold text-stone-800 dark:text-stone-100 text-lg leading-tight line-clamp-2 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
								{linha.nome}
							</h3>
						</div>
					</div>
				</motion.button>
			</DialogTrigger>

			
			<DialogContent className="sm:max-w-md bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 p-0 overflow-hidden rounded-3xl gap-0">
				<DialogTitle className="sr-only">Detalhes da Linha {linha.nome}</DialogTitle>
				<div className="relative p-6 pb-4">
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between gap-3">
							<div className="flex items-center gap-3">
								<span
									className={cn(
										"px-3 py-1 rounded-lg text-lg font-bold shadow-sm",
										color.bg,
										color.text,
									)}
								>
									{linha.linha}
								</span>
								<button
									onClick={toggleFavorite}
									className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
									type="button"
									title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
								>
									<Star
										className={cn(
											"h-6 w-6 transition-all",
											isFavorite
												? "fill-yellow-400 text-yellow-400 scale-110"
												: "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300",
										)}
									/>
								</button>
							</div>
						</div>
						<h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 leading-tight pr-8">
							{linha.nome}
						</h2>
						<p className="text-stone-500 dark:text-stone-400 text-sm">Escolha o sentido da viagem</p>
					</div>
				</div>

				<div className="p-6 pt-2 space-y-3">
					{linha.sentidoIsUnique ? (
						<Link to={allowedPaths.ida} onClick={onNavigate} className="block w-full">
							<div className="w-full flex items-center gap-5 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-stone-800/80 transition-all group active:scale-[0.99] shadow-sm cursor-pointer">
								<div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center group-hover:scale-110 transition-transform">
									<ArrowRightLeft size={22} strokeWidth={2.5} />
								</div>
								<div className="text-left flex-1">
									<div className="font-bold text-stone-800 dark:text-stone-100 text-lg">Circular</div>
									<div className="text-sm text-stone-500 dark:text-stone-400">Rota única ou circular</div>
								</div>
							</div>
						</Link>
					) : (
						<>
							<Link to={allowedPaths.ida} onClick={onNavigate} className="block w-full">
								<div className="w-full flex items-center gap-5 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-stone-800/80 transition-all group active:scale-[0.99] shadow-sm cursor-pointer">
									<div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
										<ArrowRight size={22} strokeWidth={2.5} />
									</div>
									<div className="text-left flex-1">
										<div className="font-bold text-stone-800 dark:text-stone-100 text-lg">Ida</div>
									</div>
								</div>
							</Link>
							<Link to={allowedPaths.volta} onClick={onNavigate} className="block w-full">
								<div className="w-full flex items-center gap-5 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-stone-800/80 transition-all group active:scale-[0.99] shadow-sm cursor-pointer">
									<div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
										<ArrowLeft size={22} strokeWidth={2.5} />
									</div>
									<div className="text-left flex-1">
										<div className="font-bold text-stone-800 dark:text-stone-100 text-lg">Volta</div>
									</div>
								</div>
							</Link>
						</>
					)}
				</div>
				<div className="px-6 py-4 bg-stone-100/50 dark:bg-stone-800/30 text-center border-t border-stone-100 dark:border-stone-800">
					<p className="text-xs text-stone-400 flex items-center justify-center gap-2">
						<MapIcon size={12} />
						Visualização em tempo real no mapa
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
