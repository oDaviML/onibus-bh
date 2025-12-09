import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ApiResponse } from "@/types/apiResponse";
import type { Linha } from "@/types/linha";
import { cn } from "@/lib/utils";

type FloatingHeaderProps = {
	linha?: ApiResponse<Linha> | null;
	numeroLinha: string;
	sentido: string;
	handleSentidoChange: (value: string) => void;
	lineColor: string;
	textColor: string;
};

export const FloatingHeader = ({
	linha,
	numeroLinha,
	sentido,
	handleSentidoChange,
	lineColor,
	textColor,
}: FloatingHeaderProps) => {
	return (
		<div className="absolute top-0 left-0 right-0 z-[1000] p-4 pointer-events-none flex flex-col items-center sm:flex-row sm:justify-between sm:items-start gap-4">
			{/* Info Card & Back Button */}
			<div className="flex flex-col gap-2 w-full sm:w-auto items-center sm:items-start">
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.1 }}
					className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-4 flex items-center gap-4 pointer-events-auto border border-stone-200 dark:border-stone-800 w-full sm:w-auto max-w-md"
				>
					<Link
						to="/"
						className="p-2.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors text-stone-600 dark:text-stone-300 border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
						aria-label="Voltar"
					>
						<ArrowLeft size={20} />
					</Link>

					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-0.5">
							<span
								className={cn(
									"px-2 py-0.5 rounded-md text-xs font-bold tracking-wide",
									lineColor,
									textColor,
								)}
							>
								{linha?.data.linha || numeroLinha}
							</span>
							<h2 className="font-bold text-stone-800 dark:text-stone-100 truncate text-sm sm:text-base max-w-[250px] sm:max-w-xs">
								{linha?.data.nome || "Carregando..."}
							</h2>
						</div>
					</div>
				</motion.div>

				{/* Direction Toggle */}
				{!linha?.data.sentidoIsUnique && (
					<motion.div
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg rounded-2xl p-1.5 pointer-events-auto border border-stone-200 dark:border-stone-800 w-full sm:w-auto flex justify-center"
					>
						<ToggleGroup type="single" value={sentido} onValueChange={handleSentidoChange} className="gap-1 w-full">
							<ToggleGroupItem
								value="1"
								className="flex-1 px-4 text-xs data-[state=on]:bg-sky-100 data-[state=on]:text-sky-700 dark:data-[state=on]:bg-sky-900/30 dark:data-[state=on]:text-sky-400"
							>
								Ida
							</ToggleGroupItem>
							<ToggleGroupItem
								value="2"
								className="flex-1 px-4 text-xs data-[state=on]:bg-sky-100 data-[state=on]:text-sky-700 dark:data-[state=on]:bg-sky-900/30 dark:data-[state=on]:text-sky-400"
							>
								Volta
							</ToggleGroupItem>
						</ToggleGroup>
					</motion.div>
				)}
			</div>
		</div>
	);
};
