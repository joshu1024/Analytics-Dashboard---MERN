import { AxiosError } from "axios";
import { DashboardState, KPI } from "../types/dashboard";
import api from "./api";

export const fetchDashboardKPIsApi = async (token:string):Promise<KPI> => {
  try {
    const response = await api.get<KPI>("/dashboard/kpis", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Failed to fetch dashboard KPIs";
  }
};
