import EventTrackingTable from "./components/EventTrackingTable";
import KPIGroup from "./components/KPIGroup";
import RetentionCurveChart from "./components/RetentionCurveChart";
import SignupsByCountryMap from "./components/SignupsByCountryMap";
import UserDemographicsChart from "./components/UserDemographicsChart";
import { useEffect } from "react";
import {
  fetchKPIs,
  fetchRetentionCurve,
  fetchSignupsByCountry,
  fetchUserDemographics,
  fetchEvents,
} from "../../store/slices/analyticsSlice.js";
import { useAppSelector } from "../../store"
import { useAppDispatch } from "../../store/hooks";

const AnalyticsPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);const kpis = useAppSelector((state) => state.analytics.kpis);
  const loading = useAppSelector((state) => state.analytics.loading);
  const error = useAppSelector((state) => state.analytics.error);

  useEffect(() => {
    if (!user) return;
    dispatch(fetchKPIs());
    dispatch(fetchRetentionCurve());
    dispatch(fetchSignupsByCountry());
    dispatch(fetchUserDemographics());
  }, [user]);

  if (loading && !kpis?.totalUsers) return <div>Loading analytics...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
    <h2 className="text-xl mb-4">Analytics</h2>
    <KPIGroup />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      <RetentionCurveChart />
      <UserDemographicsChart />
    </div>
    <div className="mt-4">
      <SignupsByCountryMap />
    </div>
    <div className="mt-4">
      <EventTrackingTable />
    </div>
  </div>
  );
};

export default AnalyticsPage;
