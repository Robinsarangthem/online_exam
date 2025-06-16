import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function CheckIfAlreadyAuthenticated() {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'student') return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default CheckIfAlreadyAuthenticated;
