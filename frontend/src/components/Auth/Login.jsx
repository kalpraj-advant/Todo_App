import { useState } from "react";
import { loginUser } from "../../services/auth";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validate form
    if (!form.username.trim()) {
      setError({ type: "error", message: "Username is required" });
      setIsLoading(false);
      return;
    }
    if (!form.password.trim()) {
      setError({ type: "error", message: "Password is required" });
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("username", form.username);
      data.append("password", form.password);
      const res = await loginUser(data);
      onLogin(res.data.access_token);
    } catch (err) {
      if (err.response?.status === 401) {
        setError({ type: "error", message: "Invalid username or password" });
      } else {
        setError({ type: "error", message: "An error occurred. Please try again." });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#10182A] text-white flex items-center justify-center">
      <div className="w-full max-w-sm bg-[#141B2D] p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className={`mb-4 p-3 rounded-lg ${
            error.type === "error" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
          }`}>
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["username", "password"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "password" ? "password" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 bg-[#1C2333] text-white rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 transition"
            />
          ))}
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full cursor-pointer py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
