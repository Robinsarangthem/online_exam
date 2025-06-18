import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // 'admin' or 'student'
  const [loading, setLoading] = useState(true); // 🆕 Add loading state

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    const studentData = localStorage.getItem("studentData");

    if (adminData) {
      setIsAuthenticated(true);
      setRole("admin");
    } else if (studentData) {
      setIsAuthenticated(true);
      setRole("student");
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }

    setLoading(false); // 🆕 Done initializing
  }, []);

  const login = (userRole = "student") => {
    setIsAuthenticated(true);
    setRole(userRole);

    if (userRole === "admin") {
      localStorage.setItem("admin", true);
    } else {
      localStorage.setItem("studentData", true);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminData");
    localStorage.removeItem("studentData");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, role, loading }} // 🆕 expose loading
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
