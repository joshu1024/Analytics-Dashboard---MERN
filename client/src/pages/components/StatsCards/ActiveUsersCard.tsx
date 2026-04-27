import {Rootstate, useAppSelector} from "../../../store"

export const ActiveUsersCard = () => {
  const { kpis, loading, error } = useAppSelector((state) => state.dashboard);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">Active Users</p>
      <h3 className="text-2xl font-bold">{kpis?.activeUsers ?? 0}</h3>
  </div>
  );
};
export default ActiveUsersCard;
