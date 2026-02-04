import api from "../api/api.js";
export const fetchUserApi = async (token, page = 1) => {
  try {
    const response = await api.get(`/user?page=${page}&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Unable to fetch user api";
  }
};
export const UpdateUserRoleApi = async ({ token, userId, role }) => {
  try {
    const response = await api.patch(
      `/user/${userId}/role`,
      { role },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Unable to fetch userRole api";
  }
};
export const UpdateUserStatusApi = async ({ token, userId }) => {
  try {
    const response = await api.patch(
      `/user/${userId}/status`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Unable to fetch userStatus api";
  }
};
