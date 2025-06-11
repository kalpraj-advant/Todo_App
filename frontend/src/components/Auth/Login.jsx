import { useState } from "react";
import { loginUser } from "../../services/auth";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", form.username);
    data.append("password", form.password);
    const res = await loginUser(data);
    onLogin(res.data.access_token);
  };

  return (
    <div className="min-h-screen bg-[#10182A] text-white flex items-center justify-center">
      <div className="w-full max-w-sm bg-[#141B2D] p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
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
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl">Login</button>
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
