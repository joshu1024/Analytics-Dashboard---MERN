import React, { useEffect } from "react";
import ActiveUsersCard from "./ActiveUsersCard";
import ChurnRateCard from "./ChurnRateCard";
import MRREarningsCard from "./MRREarningsCard";
import TotalUsersCard from "./TotalUsersCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardKPIs } from "../../../store/slices/dashboardSlice";
import {AppDispatch, Rootstate} from "../../../store"

const StatsCardsGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state:Rootstate) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchDashboardKPIs());
    }
  }, [dispatch, token]);
  
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
