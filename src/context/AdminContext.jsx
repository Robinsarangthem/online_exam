import { createContext, useState, useContext } from 'react';

// Create the context
const AdminContext = createContext();

// Create a provider component
export const AdminProvider = ({ children }) => {
    const [adminData, setAdminData] = useState({
        adminData:JSON.parse(localStorage.getItem('adminData')) || {},
    });
  
    // Function to update admin data
    const updateAdminData = (data) => {
        setAdminData(data);
    };

    // Function to clear admin data (logout)
    const clearAdminData = () => {
        setAdminData({
            isAuthenticated: false,
            name: '',
            email: '',
            role: '',
        });
    };

    const value = {
        adminData,
        updateAdminData,
        clearAdminData,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

// Custom hook to use admin context
export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export default AdminContext;