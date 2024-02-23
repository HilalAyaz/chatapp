import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedAuthUser = JSON.parse(localStorage.getItem("chat-user"));
    return storedAuthUser || null; 
  });

  useEffect(() => {
    // Update localStorage when authUser changes
    localStorage.setItem("chat-user", JSON.stringify(authUser));
  }, [authUser]);
  
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
