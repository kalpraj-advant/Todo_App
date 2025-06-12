import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    saveToken(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white z-10 fixed top-0 left-0 right-0">
      <Link to="/" className="font-semibold text-xl">Todo App</Link>
      <div className="space-x-4 flex items-center">
        {localStorage.getItem("token") ? (
          <button 
            onClick={handleLogout}
            className="text-red-400 hover:text-red-600 cursor-pointer transition-colors"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-blue-400 transition-colors">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
