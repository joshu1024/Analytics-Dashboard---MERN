import { useDispatch } from "react-redux";
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
} from "../../store/slices/analyticsSlice.js";

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchKPIs());
    dispatch(fetchRetentionCurve());
    dispatch(fetchSignupsByCountry());
  }, [dispatch]);
  return (
    <>
      <h2 className="text-xl mb-4">Analytics</h2>
      <KPIGroup />
      <RetentionCurveChart />
      <UserDemographicsChart />
      <SignupsByCountryMap />
      <EventTrackingTable />
    </>
  );
};

export default AnalyticsPage;
