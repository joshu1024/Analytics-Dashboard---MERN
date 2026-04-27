import { useDispatch, useSelector } from "react-redux";
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
import { AppDispatch, Rootstate } from "../../store"

const AnalyticsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: Rootstate) => state.auth);
  useEffect(() => {
    if (!user) return; 

    dispatch(fetchKPIs());
    dispatch(fetchRetentionCurve());
    dispatch(fetchSignupsByCountry());
    dispatch(fetchUserDemographics());
    dispatch(fetchEvents());
  }, [dispatch, user]);
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
