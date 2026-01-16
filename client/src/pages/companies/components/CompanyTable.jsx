import CompanyRow from "./CompanyRow";

const CompanyTable = () => {
  const companies = [
    { id: 1, name: "ACME Inc" },
    { id: 2, name: "Globex Corporation" },
    { id: 3, name: "Initech" },
    { id: 4, name: "Umbrella Corporation" },
    { id: 5, name: "Stark Industries" },
    { id: 6, name: "Wayne Enterprises" },
  ];

  return (
    <div className="bg-white rounded shadow">
      {companies.map((c) => (
        <CompanyRow key={c.id} company={c} />
      ))}
    </div>
  );
};

export default CompanyTable;
