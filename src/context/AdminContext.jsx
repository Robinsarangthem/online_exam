import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AdminContext = createContext(null);

// Provider
export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(() => {
    const stored = localStorage.getItem('adminData');
    return stored ? JSON.parse(stored) : null;
  });

  // Keep localStorage in sync when adminData changes
  useEffect(() => {
    if (adminData) {
      localStorage.setItem('adminData', JSON.stringify(adminData));
    } else {
      localStorage.removeItem('adminData');
    }
  }, [adminData]);

  // Login / set admin data
  const updateAdminData = (data) => {
    setAdminData(data);
  };

  // Logout
  const clearAdminData = () => {
    setAdminData(null);
  };

  return (
    <AdminContext.Provider value={{ adminData, updateAdminData, clearAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
