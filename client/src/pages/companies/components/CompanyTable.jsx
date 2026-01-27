import { useSelector } from "react-redux";

const CompanyTable = () => {
  const { companies, loading, error } = useSelector((state) => state.companies);

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Name</th>
          <th className="text-left py-2">Industry</th>
          <th className="text-left py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((c) => (
          <tr key={c._id} className="border-b hover:bg-gray-50">
            <td className="py-2 font-medium">{c.name}</td>
            <td>{c.industry}</td>
            <td
              className={`${
                c.status === "Active"
                  ? "text-green-600"
                  : c.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {c.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompanyTable;
