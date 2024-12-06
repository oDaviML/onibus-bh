import { Link } from "@tanstack/react-router";
import onibusImage from "../assets/onibus.png"; // Importando a imagem

export default function NavBar() {
	return (
		<nav className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex shrink-0 items-center">
							<img alt="Onibus" src={onibusImage} className="h-10 w-auto" />
							<span className="text-white font text-2xl font-bold ml-2">Onibus BH</span>
						</div>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-6">
								<Link
									to="/"
									className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
									activeProps={{ className: "bg-gray-900 text-white" }}
								>
									Linhas
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
