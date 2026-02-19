import StatCard from "./StatCard";
import { useSelector } from "react-redux";
import {Rootstate} from "../../../store"

export const ActiveUsersCard = () => {
  const { kpis, loading, error } = useSelector((state:Rootstate) => state.dashboard);
  if (loading && !kpis.activeUsers) {
    return <div>Loading...</div>;
  }
  if (error && !kpis.activeUsers) {
    return <div>Error</div>;
  }
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">Active Users</p>

      <h3 className="text-2xl font-bold">{kpis.activeUsers ?? 0}</h3>
    </div>
  );
};
export default ActiveUsersCard;
