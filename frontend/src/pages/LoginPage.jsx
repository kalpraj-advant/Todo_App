import { useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import useAuth from "../hooks/useAuth";

function LoginPage() {
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (token) => {
    saveToken(token);
    console.log("login success");
    navigate("/");
  };

  return <Login onLogin={handleLogin} />;
}

export default LoginPage;
