import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import useFetchUserRole from './useFetchUserRole';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const role = useFetchUserRole(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log('Auth state changed, user:', user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <RoleContext.Provider value={{ user, role }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  return useContext(RoleContext);
};
