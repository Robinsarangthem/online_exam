import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function StudentRoute() {
    const { isAuthenticated, role } = useAuth();
    return isAuthenticated && role === 'student' ? <Outlet /> : <Navigate to="auth/login" />;
}
