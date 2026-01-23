import StatsCards from "../components/StatsCards/StatsCardsGroup";
import RecentActivityFeed from "../components/Activity/RecentActivityFeed";
import PlanBreakdownChart from "../components/Charts/PlanBreakdownChart";
import RevenueChart from "../components/Charts/RevenueChart";
import UserGrowthChart from "../components/Charts/UserGrowthChart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDashboardKPIs } from "../../store/slices/dashboardSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return fetchDashboardKPIs();
  }, [dispatch]);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Dashboard Overview</h2>

      {/* TOP KPIs */}
      <StatsCards />

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <RevenueChart />
        </div>

        <RecentActivityFeed />
      </div>

      {/* BOTTOM CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlanBreakdownChart />
        <UserGrowthChart />
      </div>
    </div>
  );
};

export default DashboardPage;
