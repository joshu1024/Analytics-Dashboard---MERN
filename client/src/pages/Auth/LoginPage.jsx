import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authSuccess, authFail } from "../../store/slices/authSlice";
import { loginApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(authStart());

      const data = await loginApi(form);

      dispatch(
        authSuccess({
          user: {
            fullName: data.fullName,
            email: data.email,
            role: data.role,
          },
          token: data.token,
        }),
      );

      navigate("/");
    } catch (err) {
      dispatch(authFail(err));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          disabled={loading}
          className="bg-slate-900 text-white py-2 w-full rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
