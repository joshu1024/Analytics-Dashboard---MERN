import { useSelector } from "react-redux";

const FailedPaymentsList = () => {
  const { failedPayments, loading, error } = useSelector(
    (state) => state.billing,
  );
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
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="text-red-500 font-semibold">USD {tx.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FailedPaymentsList;
