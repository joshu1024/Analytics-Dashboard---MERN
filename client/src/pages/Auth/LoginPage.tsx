import React, { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser } from "../../store/slices/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { Rootstate,AppDispatch } from "../../store";
import { LoginRequest, LoginResponse } from "../../types/auth";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state:Rootstate) => state.auth);

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div className="flex justify-between mx-2">
          {" "}
          <NavLink
            to={"/register"}
            className="flex text-sm cursor-pointer underline text-blue-800 text-left "
          >
            Don&apos;t have an account? Register
          </NavLink>
          <NavLink
            to={"/forgot-password"}
            className="flex text-sm cursor-pointer underline text-blue-800 text-left "
          >
            Forgot password ?
          </NavLink>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white py-2 w-full rounded mt-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
