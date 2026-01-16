import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const handleReset = (e) => {
    e.preventDefault();
    console.log("Rset password", password);
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded shadow">
      <h3 className="text-xl mb-4 font-semibold">Reset Password</h3>
      <form className="space-y-2" onSubmit={(e) => setPassword(e.target.value)}>
        <input
          type="password"
          className="border py-2 w-full rounded"
          placeholder="New Password"
        />
        <button className="bg-slate-900 text-white py-2 w-full rounded">
          Reset password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
