import React from "react";
import { Company } from "../../../types/companies";
interface Props{
  company:Company
}
const CompanyInfoCard = ({ company }:Props) => {
  return (
    <div className="bg-white rounded shadow p-3">
      <h3 className="font-semibold mb-1 text-purple-900">Company info</h3>
      <p className="text-sm text-purple-500">{company.name}</p>
      <p className="text-sm text-purple-500">{company.plan}</p>
      <p className="text-sm text-purple-500">{company.status}</p>
    </div>
  );
};

export default CompanyInfoCard;
