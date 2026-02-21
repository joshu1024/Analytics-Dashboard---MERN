import { AxiosError } from "axios";
import { billingOverviewResponse } from "../types/billing.js";
import api from "./api.js";

export const getBillingApi = async (token:string):Promise<billingOverviewResponse> => {
  try {
    const response = await api.get<billingOverviewResponse>("/billing/overview", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "error fetching Billing page data";
  }
};
