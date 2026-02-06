import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../store/slices/authSlice.js";
import { IoArrowBackOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { message, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  return (
    <div className="max-w-md mx-auto shadow p-6 rounded relative">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <NavLink to="/login">
        <IoArrowBackOutline className="absolute top-0" />
      </NavLink>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="enter email"
          className="w-full border p-2 rounded mb-4"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="w-full bg-gray-600 text-white rounded py-2">
          {loading ? "Sending" : "Send reset link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
