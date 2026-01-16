import React from "react";

const CompanyRow = ({ company }) => {
  return (
    <div className="flex justify-between p-2 border-b">
      <span className="">{company.name}</span>
      <span className="text-blue-500 cursor-pointer">view</span>
    </div>
  );
};

export default CompanyRow;
