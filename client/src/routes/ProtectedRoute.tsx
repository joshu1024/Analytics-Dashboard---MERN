import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rootstate } from "../store";

interface Props{
  children:ReactNode
}
const ProtectedRoute:FC<Props> = ({ children }) => {
  const { token } = useSelector((state:Rootstate) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
