import React from "react";
interface CompanyUsersListProps {
  companyId: string;
}
const CompanyUsersList:React.FC<CompanyUsersListProps> = ({ companyId }) => {
  return (
    <div className="bg-white rounded shadow">
      <h3 className="font-semibold">Company users</h3>
      <p className="text-sm text-gray-500">no users found</p>
    </div>
  );
};

export default CompanyUsersList;
