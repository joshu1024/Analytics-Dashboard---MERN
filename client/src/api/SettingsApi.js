import api from "./api.js";

export const fetchAllSettingsApi = async (token) => {
  try {
    const response = await api.get("/settings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "failed to fetch General settings";
  }
};
export const fetchUpdatedSettingsApi = async (token, data) => {
  try {
    const response = await api.put("/settings/general", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "failed to fetch General settings";
  }
};
export const UpdateSMTPSettingsApi = async (token, data) => {
  try {
    const response = await api.put("/settings/smtp", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "failed to fetch General settings";
  }
};
export const UpdateBrandingApi = async (token, data) => {
  try {
    const response = await api.put("/settings/branding", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "failed to fetch General settings";
  }
};
export const GenerateApiKeyApi = async (token, data) => {
  try {
    const response = await api.post("/settings/api-keys", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "failed to fetch General settings";
  }
};
