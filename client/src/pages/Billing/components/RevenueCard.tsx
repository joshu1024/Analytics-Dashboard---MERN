import {  useAppSelector } from "../../../store";

const RevenueCard = () => {
 const { monthlyRevenue, loading } = useAppSelector((state) => state.billing);
 if (loading) return <div>Loading...</div>;
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">Monthly revenue</p>
      <p className="text-xl font-bold">${(monthlyRevenue ?? 0).toLocaleString()}</p>
    </div>
  );
};

export default RevenueCard;
