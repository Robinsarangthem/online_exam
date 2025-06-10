import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function CheckIfAlreadyAuthenticated() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const location = useLocation();
  console.log(location);
  return !isAuthenticated ? <Outlet /> : <Navigate replace to={'/'} />;
}

export default CheckIfAlreadyAuthenticated;