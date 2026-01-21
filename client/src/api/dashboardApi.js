import api from "./api"; // 👈 import your axios instance

export const fetchDashboardKPIsApi = async (token) => {
  try {
    const response = await api.get("/dashboard/kpis", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch dashboard KPIs";
  }
};
