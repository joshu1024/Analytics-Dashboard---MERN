import React from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../store";

const TransactionTable = () => {
  const {
    recentTransactions = [],
    loading,
    error,
  } = useSelector((state:Rootstate) => state.billing);
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error</div>;
  return (
    <div>
      <h3 className="font-semibold mb-2">Transactions</h3>
      <table className="w-full text-sm mb-2">
        <thead className="text-left">
          <tr>
            <th>User</th>
            <th className="text-left">Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((t) => (
            <tr key={t._id} className="border-b text-left">
              <td>{t.user?.fullName}</td>
              <td>${t.amount}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
