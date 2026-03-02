import { useParams } from "react-router-dom";
import { JSX, useEffect, useState } from "react";

interface Company {
  id: string;
  name: string;
  email: string;
}

const CompanyDetailPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (!id) return;

   const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/companies/${id}`);
        const data = await res.json();
        setCompany(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.email}</p>
    </div>
  );
};

export default CompanyDetailPage;