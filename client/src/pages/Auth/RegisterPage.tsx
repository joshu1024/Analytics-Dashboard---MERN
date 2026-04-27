import { SyntheticEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {RegisterRequest, RegisterResponse} from "../../types/auth.js"
import {
   registerUser,
} from "../../store/slices/authSlice.js";
import { AppDispatch, Rootstate } from "../../store/index.js";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state:Rootstate) => state.auth);

  const [form, setForm] = useState<RegisterRequest>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "",
  });

 const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
  const result = await dispatch(registerUser(form));
  if (registerUser.fulfilled.match(result)) {
    navigate("/");
  }
};

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Register</h3>
      {error && <div className="text-red-500">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.fullName}
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={form.username}
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          value={form.email}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          value={form.confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
               <input
          type="text"
          value={form.country}
          placeholder="Country"
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <div className="flex space-x-4">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={(e) => setForm({ ...form, gender: e.target.value as "male" })}
            />
            <span>Male</span>
          </label>

          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={(e) => setForm({ ...form, gender: e.target.value as "female"})}
            />
            <span>Female</span>
          </label>
        </div>
        <NavLink
          to={"/login"}
          className="flex text-sm cursor-pointer underline text-blue-800 text-left"
        >
          Already have an account? Login
        </NavLink>
        <button
          disabled={loading}
          className="bg-slate-900 text-white py-2 w-full rounded mt-2"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
