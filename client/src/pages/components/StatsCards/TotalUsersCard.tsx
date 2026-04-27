import {  useAppSelector} from "../../../store"

const TotalUsersCard = () => {
  const { kpis, loading, error } = useAppSelector((state) => state.dashboard);

  if (loading && !kpis?.totalUsers) {
    return <div>Loading...</div>;
  }

  if (error && !kpis?.totalUsers) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">Total Users</p>

      <h3 className="text-2xl font-bold">{kpis?.totalUsers ?? 0}</h3>
    </div>
  );
};

export default TotalUsersCard;
