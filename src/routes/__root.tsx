import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<main className="min-h-screen bg-background flex flex-col">
			<nav className="bg-muted p-4 shadow-lg">
				<div className="container mx-auto flex justify-between items-center">
					<h1 className="text-xl font-extrabold">Onibus BH</h1>
					<div className="flex gap-4">
						<Link to="/" className="hover:text-blue-300 transition-colors [&.active]:font-bold">
							Linhas
						</Link>
					</div>
				</div>
			</nav>

			<section className="flex-grow p-12">
				<Outlet />
			</section>
		</main>
	),
});
