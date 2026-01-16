import React from "react";
import CompanyTable from "./components/CompanyTable";
import CompanyDetailPage from "./CompanyDetailPage";

const CompaniesPage = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Companies</h2>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Industry</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Acme Inc</td>
              <td>SaaS</td>
              <td className="text-green-600">Active</td>
            </tr>
            <tr>
              <td className="py-2">Globex</td>
              <td>FinTech</td>
              <td className="text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
        <CompanyTable />
        <CompanyDetailPage />
      </div>
    </div>
  );
};

export default CompaniesPage;
