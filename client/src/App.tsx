import React, { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { fetchCurrentUser } from "./store/slices/authSlice";
import { useAppDispatch } from "./store/hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

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