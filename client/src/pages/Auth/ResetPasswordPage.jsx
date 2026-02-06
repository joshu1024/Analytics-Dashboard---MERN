import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../store/slices/authSlice.js";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((s) => s.auth);

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(resetPassword({ token, password }));

    if (resetPassword.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h3 className="text-xl mb-4 font-semibold">Reset Password</h3>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          className="border py-2 w-full rounded"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-slate-900 text-white py-2 w-full rounded"
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
