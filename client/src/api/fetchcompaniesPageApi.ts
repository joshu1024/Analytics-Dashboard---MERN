import { AxiosError } from "axios";
import api from "./api";
import { CompanyResponse } from "../types/companies";
export const fetchcompaniesPageApi = async (token:string, page = 1):Promise<CompanyResponse> => {
  try {
    const response = await api.get<CompanyResponse>(`/companies?page=${page}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Error fetching companies data";
  }
};
