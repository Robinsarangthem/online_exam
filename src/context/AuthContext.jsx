import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('user') || !!localStorage.getItem('adminData')
    );

    // Optionally, track role if needed
    const [role, setRole] = useState(
        localStorage.getItem('adminData') ? 'admin' : (localStorage.getItem('user') ? 'user' : null)
    );


    const login = (userRole = 'user') => {
        if (userRole === 'admin') {
            localStorage.setItem('adminData', 'true');
            setRole('admin');
        } else {
            localStorage.setItem('user', 'true');
            setRole('user');
        }
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('adminData');
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

