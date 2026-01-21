import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "../../store/slices/authSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleLogin = () => {
    console.log("Dispatching loginStart");
    dispatch(loginStart());
    setTimeout(() => {
      console.log("Dispatching loginSuccess");
      dispatch(
        loginSuccess({
          user: { id: 1, name: "Joe" },
          token: "my token",
        }),
      );
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow">
      <h1 className="text-xl mb-4">Login</h1>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-gray-600 text-white py-2 rounded"
      >
        {loading ? "Logging in" : "Login"}
      </button>
    </div>
  );
};

export default LoginPage;
