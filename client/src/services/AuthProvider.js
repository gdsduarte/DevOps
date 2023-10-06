import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import useFetchUserRole from "./useFetchUserRole";

// Create the auth context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provide the user and role to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const role = useFetchUserRole(user);

  // Listen for changes to the user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Provide the user and role to the app
  const value = {
    user,
    role,
  };

  // Render the app
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
