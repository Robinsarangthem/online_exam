import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthGuard = ({ children }) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage

    // If user is not authenticated, redirect to login page
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Handle student access
    if (user.role === 'student') {
        // Allow access only to quiz routes
        if (!location.pathname.startsWith('/quiz')) {
            return <Navigate to="/quiz" replace />;
        }
    }

    // Handle admin access
    if (user.role === 'admin') {
        // Allow access only to admin dashboard routes
        if (!location.pathname.startsWith('/admin')) {
            return <Navigate to="/admin/dashboard" replace />;
        }
    }

    // If all checks pass, render the protected content
    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthGuard;