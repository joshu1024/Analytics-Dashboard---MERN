import api from "./api.js";

export const getBillingApi = async (token) => {
  try {
    const response = await api.get("/billing/overview", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "error fetching Billing page data";
  }
};
