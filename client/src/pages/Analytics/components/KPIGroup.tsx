import { useAppSelector} from "../../../store/index.js"
import { KPICard } from "./KPICard";


const KPIGroup = () => {
  const { kpis, loading } = useAppSelector((state) => state.analytics);

  if (loading) return <p>Loading kpi data...</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <KPICard title="Users" value={kpis?.totalUsers ?? 0} />
    <KPICard title="Retention" value={`${kpis?.retention ?? 0}%`} />
    <KPICard title="Churn" value={`${kpis?.churn ?? 0}%`} />
    <KPICard title="ARPU" value={`$${kpis?.arpu?.toLocaleString()}`} />
    </div>
  );
};

export default KPIGroup;
