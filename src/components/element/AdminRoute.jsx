import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null; // or a <Loader /> component

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
