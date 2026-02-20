import React from "react";
import CompanyInfoCard from "./components/CompanyInfoCard";
import CompanyUsersList from "./components/CompanyUsersList";
import { Company } from "../../types/companies";
interface Props{
  company:Company | null
}
const CompanyDetailPage = ({ company }:Props) => {
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
      <CompanyUsersList companyId={company._id} />
    </div>
  );
};

export default CompanyDetailPage;
