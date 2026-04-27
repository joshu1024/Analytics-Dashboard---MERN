import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

interface Props {
  children: ReactNode;
}


const ProtectedRoute: FC<Props> = ({ children }) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  // ✅ Wait for fetchCurrentUser to complete
  if (loading) return <div>Loading...</div>;

  // ✅ Only redirect after we know user is null
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;

};

export default ProtectedRoute;