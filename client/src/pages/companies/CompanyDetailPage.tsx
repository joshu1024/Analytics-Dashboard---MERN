import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../../types/companies";
import api from "../../api/api";

// No Props needed
const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const { data } = await api.get(`/companies/${id}`);
      setCompany(data.company);
    };
    fetchCompany();
  }, [id]);

  if (!company) return <div>Loading...</div>;

  return <div>{company.name}</div>;
};

export default CompanyDetailPage;