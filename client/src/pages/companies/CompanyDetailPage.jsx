import React from "react";
import CompanyInfoCard from "./components/CompanyInfoCard";
import CompanyUsersList from "./components/CompanyUsersList";

const CompanyDetailPage = () => {
  return (
    <div className="space-y-2">
      <CompanyInfoCard />
      <CompanyUsersList />
    </div>
  );
};

export default CompanyDetailPage;
