import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rootstate } from "../store";

interface Props{
  children:ReactNode
}
const ProtectedRoute:FC<Props> = ({ children }) => {
  const { user } = useSelector((state: Rootstate) => state.auth);

if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
