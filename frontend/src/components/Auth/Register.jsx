import { useState } from "react";
import { registerUser } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ email: "", username: "", first_name: "", last_name: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Clear error when user types
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      setError({ type: "error", message: "Email is required" });
      return false;
    }
    if (!form.username.trim()) {
      setError({ type: "error", message: "Username is required" });
      return false;
    }
    if (!form.first_name.trim()) {
      setError({ type: "error", message: "First name is required" });
      return false;
    }
    if (!form.last_name.trim()) {
      setError({ type: "error", message: "Last name is required" });
      return false;
    }
    if (!form.password.trim()) {
      setError({ type: "error", message: "Password is required" });
      return false;
    }
    if (form.password.length < 6) {
      setError({ type: "error", message: "Password must be at least 6 characters long" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await registerUser(form);
      setError({ type: "success", message: "Registration successful! Redirecting to login..." });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response?.data?.detail) {
        setError({ type: "error", message: err.response.data.detail });
      } else {
        setError({ type: "error", message: "An error occurred during registration. Please try again." });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#10182A] text-white flex items-center justify-center">
      <div className="w-full max-w-sm bg-[#141B2D] p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
        {error && (
          <div className={`mb-4 p-3 rounded-lg ${
            error.type === "error" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
          }`}>
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["email", "username", "first_name", "last_name"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 bg-[#1C2333] text-white rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 transition"
            />
          ))}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 bg-[#1C2333] text-white rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 transition"
          />
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl">Register</button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
