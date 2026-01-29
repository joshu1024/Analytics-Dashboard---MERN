import React from "react";
import { useSelector } from "react-redux";
const transactions = [
  { id: 1, user: "Joe", amount: "$200", status: "paid" },
  { id: 2, user: "Kip", amount: "$300", status: "failed" },
];

const TransactionTable = () => {
  const {
    recentTransactions = [],
    loading,
    error,
  } = useSelector((state) => state.billing);
  return (
    <div>
      <h3 className="font-semibold mb-2">Transactions</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((t) => (
            <tr key={t._id} className="border-b ">
              <td>{t.user?.fullName}</td>
              <td>{t.amount}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
