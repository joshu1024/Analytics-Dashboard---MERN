import api from "./api";
export const fetchcompaniesPageApi = async (token, page = 1) => {
  try {
    const response = await api.get(`/companies?page=${page}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error fetching companies data";
  }
};
