import { useSelector } from "react-redux";

export const ChurnRateCard = () => {
  const { kpis, loading, error } = useSelector((state) => state.dashboard);
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-gray-500">Churn Rate</h3>
      <p className="text-2xl font-bold">{kpis?.churnRate || 0}%</p>
    </div>
  );
};
export default ChurnRateCard;
