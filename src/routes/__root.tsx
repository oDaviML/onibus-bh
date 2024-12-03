import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
          <div className="flex gap-4">
            <Link
              to="/"
              className="hover:text-blue-300 transition-colors [&.active]:font-bold"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      <section className="flex-grow">

        <Outlet />
      </section>
    </main>
  ),
});
