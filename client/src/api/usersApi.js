import api from "../api/api.js";
const fetchUserApi = async (token) => {
  try {
    const response = await api.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.messgae || "Unable to fetch user api";
  }
};

export default fetchUserApi;
