import { useSelector } from "react-redux";

export const MRREarningsCard = () => {
  const { kpis, loading, error } = useSelector((state) => state.dashboard);
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-sm text-gray-500">MRR Earnings</h3>
      <p className="text-2xl font-bold">{kpis.mrr}</p>
    </div>
  );
};
export default MRREarningsCard;
