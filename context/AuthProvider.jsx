// context/AuthContext.js
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Named export for hook
export const useAuth = () => {
  return useContext(AuthContext);
};
