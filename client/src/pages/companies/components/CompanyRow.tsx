import React from "react";
import { Company } from "../../../types/companies";
interface Props{
  company:Company
}
const CompanyRow = ({ company }:Props) => {
  return (
    <div className="flex justify-between p-2 border-b">
      <div className="">
        <p className="font-medium">{company.name}</p>
        <p className="text-sm text-gray-500">{company.industry}</p>
      </div>
      <span
        className={`text-sm ${status === "active" ? "text-green-600" : "text-yellow-600"}`}
      >
        {company.status}
      </span>
    </div>
  );
};

export default CompanyRow;
