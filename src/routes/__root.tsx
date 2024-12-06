import NavBar from "@/components/navBar";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<main className="min-h-screen bg-background flex flex-col">
			<NavBar />

			<section className="flex-grow p-12">
				<Outlet />
			</section>
		</main>
	),
});
