import { companiesPage } from "../../../store/slices/companiesSlice.js";
import {  useAppSelector } from "../../../store/index.js";
import { Company } from "../../../types/companies.js";
import { useAppDispatch } from "../../../store/hooks.js";
interface Props {
  onSelectedCompany:(company:Company) => void
}
const CompanyTable = ({ onSelectedCompany }:Props) => {
  const dispatch = useAppDispatch();
  const { companies, totalPages, page, loading, error } = useAppSelector(
    (state) => state.companies,
  );
    if (loading && companies.length === 0) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    
      function handlePageChange(newPage:number) {
        dispatch(companiesPage(newPage));
      }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute top-20 right-100 text-5xl rounded-full border-4 border-gray-400 w-20 h-20 animate-spin border-t-0"></div>
      )}
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
                className={`text-sm ${c.status === "Active" ? "text-green-600" : "text-yellow-600"}`}
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
