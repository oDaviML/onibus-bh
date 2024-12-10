import type { ApiResponse } from "@/types/apiResponse";
import type { Linha } from "@/types/linha";
import type { AxiosPromise } from "axios";
import apiClient from "./axiosConfig";
import "../index.css";

export const getAllLinhas = async (filtrarLinhas: boolean): AxiosPromise<ApiResponse<Linha[]>> => {
	let response: AxiosPromise<ApiResponse<Linha[]>>;

	if (filtrarLinhas) {
		response = apiClient.get<ApiResponse<Linha[]>>("/linhas/coordenadas");
	} else {
		response = apiClient.get<ApiResponse<Linha[]>>("/linhas/");
	}

	return response;
};

export const getLinhaByNumeroLinha = async (numeroLinha: number): AxiosPromise<ApiResponse<Linha>> => {
	const response = await apiClient.get<ApiResponse<Linha>>(`/linhas/${numeroLinha}`);
	return response;
};
