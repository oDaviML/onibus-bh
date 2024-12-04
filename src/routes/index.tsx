import Cardonibus from "@/components/cardonibus";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="p-5 shadow-md rounded-md flex flex-col items-center">
			<Input type="text" placeholder="Procurar linha" className="max-w-md" />
			<section className="flex gap-4 flex-wrap my-4 justify-center">
				{Array.from({ length: 10 }, (_, index) => (
					<Cardonibus linha={{ numeroLinha: index, nome: "", linha: "" }} key={index} />
				))}
			</section>
		</div>
	);
}
