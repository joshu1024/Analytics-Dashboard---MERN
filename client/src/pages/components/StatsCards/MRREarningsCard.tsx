import { useSelector } from "react-redux";
import {Rootstate, useAppSelector} from "../../../store"

export const MRREarningsCard = () => {
  const { kpis, loading, error } = useAppSelector((state) => state.dashboard);

 if (loading && !kpis?.mrr) {
    return <div>Loading...</div>;
  }

  if (error && !kpis?.mrr) {
    <div className="text-red-500">{error}</div>
  }
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-sm text-gray-500">MRR Earnings</h3>
      <p className="text-2xl font-bold">{kpis?.mrr ?? 0}</p>
    </div>
  );
};
export default MRREarningsCard;
