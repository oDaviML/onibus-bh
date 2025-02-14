import NavBar from "@/components/navBar";
import NotFound from "@/components/notFound";
import ServerError from "@/components/serverError";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<main className="min-h-screen bg-background flex flex-col">
			<NavBar />
			<section className="flex-grow p-6">
				<Outlet />
			</section>
			<Toaster />
		</main>
	),
	errorComponent: ServerError,
	notFoundComponent: NotFound,
});
