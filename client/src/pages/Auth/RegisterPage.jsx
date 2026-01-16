import React, { useState } from "react";

const RegisterPage = () => {
  const [form, setForm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register", form);
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow ">
      <h3 className="text-xl font-semibold mb-4">Register</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter your name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="border p-2 rounded w-full"
          placeholder="Enter your email address"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="border p-2 rounded w-full"
          onChange={(e) => setForm({ ...password, name: e.target.value })}
        />
        <button className="bg-slate-900 text-white py-2 w-full rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
