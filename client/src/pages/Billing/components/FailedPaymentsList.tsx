import {  useAppSelector } from "../../../store";

const FailedPaymentsList = () => {
  const { failedPayments, loading, error } = useAppSelector(
    (state) => state.billing,
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error</div>;
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Failed Payments</h3>

      {failedPayments.length === 0 ? (
        <p className="text-sm text-gray-500">No failed payments.</p>
      ) : (
        <ul className="space-y-3">
          {failedPayments.map((tx) => (
            <li
              key={tx._id}
              className="border rounded p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {tx.user?.fullName || "Unknown User"}
                </p>
                <p className="text-xs text-gray-500">
                  {tx.paymentMethod} • {tx.failureReason}
                </p>
                <p className="text-xs text-gray-400">
                  {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() :"unknown date"}
                </p>
              </div>

              <p className="text-red-500 font-semibold">{tx.currency} {tx.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FailedPaymentsList;
