import { createContext, useContext, useState } from "react";

const authUser = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <authUser.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </authUser.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
