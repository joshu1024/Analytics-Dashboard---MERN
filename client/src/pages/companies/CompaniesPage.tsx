import { useEffect, useState } from "react";
import { companiesPage } from "../../store/slices/companiesSlice";
import CompanyTable from "./components/CompanyTable";
import CompanyDetailPage from "./CompanyDetailPage";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

const CompaniesPage = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state)=>state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) return;
    dispatch(companiesPage(1));
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Companies</h2>

      <div className="bg-white p-4 rounded shadow cursor-pointer">
        <CompanyTable onSelectedCompany={(company) => navigate(`/companies/${company._id}`)} />
      </div>
      <div className="mt-4 cursor-pointer">
        <CompanyDetailPage
        />
      </div>
    </div>
  );
}

export default CompaniesPage;
