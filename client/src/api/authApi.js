import api from "../api/api.js";

export const registerApi = async (formData) => {
  try {
    const { data } = await api.post("/auth/register", formData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginApi = async (formData) => {
  try {
    const { data } = await api.post("/auth/login", formData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Unable to fetch login api";
  }
};
export const loginOut = async () => {
  try {
    const { data } = await api.post("/auth/logout");
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Unable to fetch login api";
  }
};
