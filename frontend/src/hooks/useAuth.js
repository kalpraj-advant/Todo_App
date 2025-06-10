import { useState } from "react";
import { setAuthToken } from "../lib/api";

const useAuth = () => {
  const [token, setToken] = useState(null);

  const saveToken = (newToken) => {
    setToken(newToken);
    setAuthToken(newToken);
  };

  return { token, saveToken };
};

export default useAuth;
