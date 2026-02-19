import { useSelector } from "react-redux";
import {Rootstate} from "../../../store"

export const MRREarningsCard = () => {
  const { kpis, loading, error } = useSelector((state:Rootstate) => state.dashboard);
  if (loading) return <div>Loading</div>;
  if (error) return <div className="text-red-500">Error!</div>;
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-sm text-gray-500">MRR Earnings</h3>
      <p className="text-2xl font-bold">{kpis.mrr}</p>
    </div>
  );
};
export default MRREarningsCard;
