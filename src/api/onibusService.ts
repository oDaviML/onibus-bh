import type { ApiResponse } from "@/types/apiResponse";
import type { Onibus } from "@/types/onibus";
import type { AxiosPromise } from "axios";
import apiClient from "./axiosConfig";

export const getAllOnibus = async (): AxiosPromise<ApiResponse<Onibus[]>> => {
	const response = await apiClient.get<ApiResponse<Onibus[]>>("/onibus/");
	return response;
};

export const getOnibusByLinha = async (numeroLinha: number): AxiosPromise<ApiResponse<Onibus[]>> => {
	const response = await apiClient.get<ApiResponse<Onibus[]>>(`/onibus/linha/${numeroLinha}`);
	return response;
};
