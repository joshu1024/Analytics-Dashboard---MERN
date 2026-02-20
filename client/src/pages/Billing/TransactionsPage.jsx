import { useSelector } from "react-redux";

const TransactionsPage = () => {
  const { recentTransactions, loading, error } = useSelector(
    (state) => state.billing,
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error</div>;
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      {recentTransactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div
              key={tx._id}
              className="flex justify-between items-center border rounded p-4"
            >
              <div>
                <p className="font-medium">
                  {tx.user?.fullName || "Unknown User"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm capitalize ${tx.status === "success" ? "text-green-400" : "text-gray-400"}`}
                >
                  {tx.paymentMethod} • {tx.status}
                </p>
              </div>

              <p
                className={`font-semibold ${
                  tx.status === "refunded"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {tx.currency} {tx.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
