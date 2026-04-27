import React, { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/slices/authSlice";
import { AppDispatch } from "./store";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;