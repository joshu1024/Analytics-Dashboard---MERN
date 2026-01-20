import axios from "axios";

export const fetchDashboardKPIsApi = (token) => {
  const response = axios.get("/api/dashboard/kpis", {
    headers: { Authorization: `Bearer${token}` },
  });
  return response.data;
};
export default { fetchDashboardKPIsApi };
