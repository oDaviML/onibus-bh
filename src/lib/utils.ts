import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getLineColor = (num: number) => {
	const colors = [
		{ bg: "bg-red-500", text: "text-white" },
		{ bg: "bg-blue-500", text: "text-white" },
		{ bg: "bg-green-500", text: "text-white" },
		{ bg: "bg-amber-500", text: "text-white" },
		{ bg: "bg-violet-500", text: "text-white" },
		{ bg: "bg-pink-500", text: "text-white" },
	];
	return colors[((num % colors.length) + colors.length) % colors.length];
};
