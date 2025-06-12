import { useState } from "react";
import { setAuthToken } from "../lib/api";

const useAuth = () => {
  const [token, setToken] = useState(() => {
    // Initialize token from localStorage if it exists
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setAuthToken(savedToken);
      return savedToken;
    }
    return null;
  });

  const saveToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      setAuthToken(newToken);
    } else {
      localStorage.removeItem("token");
      setAuthToken(null);
    }
  };

  return { token, saveToken };
};

export default useAuth;
