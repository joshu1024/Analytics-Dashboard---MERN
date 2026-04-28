import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../../types/companies";
import api from "../../api/api";

// No Props needed
const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  useEffect(() => {
   const fetchCompany = async () => {
  try {
    const { data } = await api.get(`/companies/${id}`);
    setCompany(data.company);
      } catch (err) {
        console.error("Failed to fetch company:", err);
      }
    };
    fetchCompany();
  }, [id]);

  if (!company) return <div>Company not found...</div>;

  return (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold">{company.name}</h2>
    <p>{company.industry}</p>
    <p>{company.status}</p>
    <p>{company.plan}</p>
  </div>
);
};

export default CompanyDetailPage;