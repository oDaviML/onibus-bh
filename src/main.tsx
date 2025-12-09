import { StrictMode } from "react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { LinhasFavoritasProvider } from "./contexts/LinhasFavoritasContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
					<LinhasFavoritasProvider>
						<RouterProvider router={router} />
					</LinhasFavoritasProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</StrictMode>,
	);
}
