// context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`
        ); // Call only once
        setUser(res.data.user); // set user object
      } catch (err) {
        setUser(null); // not authenticated
      } finally {
        setLoading(false); // stop loading regardless
      }
    };

    fetchUser(); // Fetch on first mount
  }, []);
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
