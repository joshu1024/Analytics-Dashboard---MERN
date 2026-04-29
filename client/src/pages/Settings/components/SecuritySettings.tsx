import { useAppSelector } from "../../../store";
import { useAppDispatch } from "../../../store/hooks";
import { sendResetPasswordEmail } from "../../../store/slices/settingsSlice";

const SecuritySettings = () => {
  const dispatch = useAppDispatch();
  const { loading, error, message } = useAppSelector((state) => state.settings);

  const resetPassword = async () => {
    await dispatch(sendResetPasswordEmail());
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Security Settings</h3>
      {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={resetPassword}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Sending..." : "Reset Password"}
      </button>
    </div>
  );
};
export default SecuritySettings;
