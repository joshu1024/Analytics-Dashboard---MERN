import { useSelector } from "react-redux";
const TotalUsersCard = () => {
  const { kpis, loading, error } = useSelector((state) => state.dashboard);

  if (loading && !kpis.totalUsers) {
    return <div>Loading...</div>;
  }

  if (error && !kpis.totalUsers) {
    return <div>Error</div>;
  }
  console.log("KPIs FROM STORE:", kpis);

  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">Total Users</p>

      <h3 className="text-2xl font-bold">{kpis.totalUsers ?? 0}</h3>
    </div>
  );
};

export default TotalUsersCard;
