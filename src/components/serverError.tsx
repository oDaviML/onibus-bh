import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ServerError() {
	return (
		<div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-6 animate-fade-in bg-stone-50 dark:bg-stone-950">
			<div className="w-24 h-24 bg-red-50 dark:bg-red-900/10 rounded-3xl flex items-center justify-center mb-6 border border-red-100 dark:border-red-900/20">
				<AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
			</div>
			<h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-3 text-center tracking-tight">
				Algo deu errado
			</h1>
			<p className="text-stone-500 dark:text-stone-400 text-center max-w-md mb-8 text-lg">
				Tivemos um problema técnico ao processar sua solicitação. Por favor, tente novamente em alguns instantes.
			</p>
			<button
				type="button"
				onClick={() => window.location.reload()}
				className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-200 font-medium rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95"
			>
				<RefreshCcw size={18} />
				Tentar novamente
			</button>
		</div>
	);
}