import NotFound from "@/components/notFound";
import ServerError from "@/components/serverError";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<main className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col font-sans transition-colors duration-300">
			<section className="flex-grow w-full">
				<Outlet />
			</section>
			<Toaster />
		</main>
	),
	errorComponent: ServerError,
	notFoundComponent: NotFound,
});
