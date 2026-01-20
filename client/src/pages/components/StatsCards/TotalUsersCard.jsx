import { useSelector } from "react-redux";
const TotalUsersCard = () => {
  const { kpis, loading, error } = useSelector((state) => state.dashboard);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">Active Users</p>
      <h3 className="text-2xl font-bold">{kpis?.activeUsers ?? 0}</h3>
    </div>
  );
};

export default TotalUsersCard;
