import React from "react";
import CompanyInfoCard from "./components/CompanyInfoCard";
import CompanyUsersList from "./components/CompanyUsersList";

const CompanyDetailPage = ({ company }) => {
  if (!company) {
    return (
      <div className="bg-white rounded p-4 shadow text-gray-500">
        Select a company to view details
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <CompanyInfoCard company={company} />
      <CompanyUsersList companyId={company.id} />
    </div>
  );
};

export default CompanyDetailPage;
