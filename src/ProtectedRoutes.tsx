import React from "react";
import { useAuth } from "./authProvider";
import Error from "./Error/Error";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Error description="You dont have access to this page" />
  );
};

export default ProtectedRoute;
