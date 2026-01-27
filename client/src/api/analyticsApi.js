import api from "./api.js";
export const fetchRetentionCurveApi = async (token) => {
  try {
    const response = await api.get("/analytics/retention", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    error.response?.data?.message || "Failed to fetch retention data";
  }
};
export const fetchAnalyticsKPIsApi = async (token) => {
  try {
    const response = await api.get("/analytics/kpis", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    error.response?.data?.message || "Failed to fetch kpi data";
  }
};
export const fetchUserDemographicsApi = async (token) => {
  try {
    const response = await api.get("/analytics/user-demographics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    error.response?.data?.message || "Failed to fetch user demographics data";
  }
};
export const fetchSignupsByCountryApi = async (token) => {
  try {
    const response = await api.get("/analytics/signup-bycountry", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    error.response?.data?.message || "Failed to fetch signup-bycountry data";
  }
};

export const fetchEventsApi = async (token) => {
  try {
    const response = await api.get("/analytics/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    error.response?.data?.message || "Failed to fetch recent events data";
  }
};
