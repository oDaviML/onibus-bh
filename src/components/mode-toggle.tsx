import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="relative p-3 rounded-xl bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-700 hover:border-sky-300 dark:hover:border-sky-700 text-stone-600 dark:text-stone-300 transition-all hover:scale-105 active:scale-95 shadow-sm"
			aria-label="Alternar tema"
			type="button"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Alternar tema</span>
		</button>
	);
}
