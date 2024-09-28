/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("chat-user-token")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
