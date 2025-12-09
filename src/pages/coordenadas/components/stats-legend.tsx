import { motion } from "framer-motion";

type StatsLegendProps = {
	count: number;
};

export const StatsLegend = ({ count }: StatsLegendProps) => {
	return (
		<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] pointer-events-none w-full flex justify-center px-4">
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="bg-stone-800/90 dark:bg-black/70 backdrop-blur-md text-stone-50 px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 pointer-events-auto border border-stone-700"
			>
				<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
				{count} ônibus em circulação
			</motion.div>
		</div>
	);
};
