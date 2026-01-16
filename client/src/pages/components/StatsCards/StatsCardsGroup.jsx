import React from "react";
import ActiveUsersCard from "./ActiveUsersCard";
import ChurnRateCard from "./ChurnRateCard";
import MRREarningsCard from "./MRREarningsCard";
import TotalUsersCard from "./TotalUsersCard";

const StatsCardsGroup = () => {
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
