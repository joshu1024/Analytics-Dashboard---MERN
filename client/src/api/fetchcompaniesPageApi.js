import api from "./api";
export const fetchcompaniesPageApi = async (token) => {
  try {
    const response = await api.get("/companies", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error fetching companies data";
  }
};
