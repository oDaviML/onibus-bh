import Coordenadas from "@/pages/coordenadas/coordenadas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$numeroLinha/$sentido")({
	component: RouteComponent,

	loader: async ({ params }) => {
		const numeroLinha = params.numeroLinha;
		const sentido = params.sentido;
		return { numeroLinha, sentido };
	},
});

function RouteComponent() {
	const { numeroLinha, sentido } = Route.useParams();
	return <Coordenadas numeroLinha={numeroLinha} sentido={sentido} />;
}
