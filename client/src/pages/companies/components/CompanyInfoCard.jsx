import React from "react";

const CompanyInfoCard = ({ company }) => {
  return (
    <div className="bg-white rounded shadow p-3">
      <h3 className="font-semibold mb-1">Company info</h3>
      <p className="text-sm ">{company.name}</p>
      <p className="text-sm ">{company.plan}</p>
      <p className="text-sm ">{company.status}</p>
    </div>
  );
};

export default CompanyInfoCard;
