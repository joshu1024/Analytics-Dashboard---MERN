import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { companiesPage } from "../../store/slices/companiesSlice";
import CompanyTable from "./components/CompanyTable";
import CompanyDetailPage from "./CompanyDetailPage";

const CompaniesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(companiesPage());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Companies</h2>

      <div className="bg-white p-4 rounded shadow">
        <CompanyTable className="cursor-pointer" />
      </div>

      <div className="mt-4">
        <CompanyDetailPage className="cursor-pointer" />
      </div>
    </div>
  );
};

export default CompaniesPage;
