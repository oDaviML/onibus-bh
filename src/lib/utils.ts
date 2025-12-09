import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getLineColor = (num: number) => {
	const colors = [
		{ bg: "#ef4444", text: "#ffffff" },
		{ bg: "#3b82f6", text: "#ffffff" },
		{ bg: "#22c55e", text: "#ffffff" },
		{ bg: "#f59e0b", text: "#ffffff" },
		{ bg: "#8b5cf6", text: "#ffffff" },
		{ bg: "#ec4899", text: "#ffffff" },
	];
	return colors[((num % colors.length) + colors.length) % colors.length];
};
