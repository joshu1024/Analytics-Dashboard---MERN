import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { companiesPage } from "../../store/slices/companiesSlice";
import CompanyTable from "./components/CompanyTable";
import CompanyDetailPage from "./CompanyDetailPage";
import { AppDispatch } from "../../store";
import { Company } from "../../types/companies";

const CompaniesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    dispatch(companiesPage(1));
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Companies</h2>

      <div className="bg-white p-4 rounded shadow cursor-pointer">
        <CompanyTable
          onSelectedCompany={setSelectedCompany}
        />
      </div>

      <div className="mt-4 cursor-pointer">
        <CompanyDetailPage
         company={selectedCompany}
        />
      </div>
    </div>
  );
};

export default CompaniesPage;
