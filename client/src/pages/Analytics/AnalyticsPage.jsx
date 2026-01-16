import EventTrackingTable from "./components/EventTrackingTable";
import KPIGroup from "./components/KPIGroup";
import RetentionCurveChart from "./components/RetentionCurveChart";
import SignupsByCountryMap from "./components/SignupsByCountryMap";
import UserDemographicsChart from "./components/UserDemographicsChart";

const AnalyticsPage = () => {
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
