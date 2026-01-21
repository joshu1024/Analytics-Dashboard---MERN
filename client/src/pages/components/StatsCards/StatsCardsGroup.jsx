import React, { useEffect } from "react";
import ActiveUsersCard from "./ActiveUsersCard";
import ChurnRateCard from "./ChurnRateCard";
import MRREarningsCard from "./MRREarningsCard";
import TotalUsersCard from "./TotalUsersCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardKPIs } from "../../../store/slices/dashboardSlice";

const StatsCardsGroup = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchDashboardKPIs());
    }
  }, [dispatch, token]);

  useEffect(() => {
    console.log("DISPATCH FUNCTION:", dispatch);
  }, []);
  console.log("THUNK VALUE:", fetchDashboardKPIs);
  const kpis = useSelector((state) => state.dashboard.kpis);

  useEffect(() => {
    console.log("KPIs FROM STORE:", kpis);
  }, [kpis]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 ">
      <ActiveUsersCard />
      <ChurnRateCard />
      <MRREarningsCard />
      <TotalUsersCard />
    </div>
  );
};

export default StatsCardsGroup;
