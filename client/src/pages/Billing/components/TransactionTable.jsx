import React from "react";
const transactions = [
  { id: 1, user: "Joe", amount: "$200", status: "paid" },
  { id: 2, user: "Kip", amount: "$300", status: "failed" },
];

const TransactionTable = () => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Transactions</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">User</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr id={t.id} className="border-t">
              <td>{t.user}</td>
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
