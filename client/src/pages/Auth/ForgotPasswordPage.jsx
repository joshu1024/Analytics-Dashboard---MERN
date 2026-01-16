import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("reset link sent to", email);
  };
  return (
    <div className="max-w-md mx-auto shadow p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
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
          Send reset link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
