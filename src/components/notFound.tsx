import { Link } from "@tanstack/react-router";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
	return (
		<div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-6 animate-fade-in bg-stone-50 dark:bg-stone-950">
			<div className="w-24 h-24 bg-stone-100 dark:bg-stone-900 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-stone-200 dark:border-stone-800">
				<MapPinOff className="w-10 h-10 text-stone-400 dark:text-stone-500" />
			</div>
			<h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-3 text-center tracking-tight">
				Página não encontrada
			</h1>
			<p className="text-stone-500 dark:text-stone-400 text-center max-w-md mb-8 text-lg">
				A rota que você tentou acessar não existe ou foi movida. Verifique o endereço e tente novamente.
			</p>
			<Link
				to="/"
				className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-95"
			>
				Voltar para o início
			</Link>
		</div>
	);
}