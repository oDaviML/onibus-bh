export type ApiResponse<T> = {
	timestamp: number;
	message: string;
	status: string;
	data: T;
};
