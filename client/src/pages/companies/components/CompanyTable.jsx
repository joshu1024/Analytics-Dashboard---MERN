import { useSelector, useDispatch } from "react-redux";
import { companiesPage } from "../../../store/slices/companiesSlice.js";

const CompanyTable = ({ onSelectedCompany }) => {
  const dispatch = useDispatch();
  const { companies, totalPages, page, loading, error } = useSelector(
    (state) => state.companies,
  );

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  function handlePageChange(newPage) {
    dispatch(companiesPage(newPage));
  }

  return (
    <div>
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
            <tr
              key={c._id}
              className="border-b hover:bg-gray-50"
              onClick={() => onSelectedCompany(c)}
            >
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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">{`${page} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompanyTable;
