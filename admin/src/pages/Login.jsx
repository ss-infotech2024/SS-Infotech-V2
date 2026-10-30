import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Invalid username or password.");
      }
      localStorage.setItem("isAdminLoggedIn", true);
      navigate("/");
    } catch (loginError) {
      setError(loginError.message || "Could not sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden">
      {/* Left Side Illustration */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 h-full items-center justify-center p-8"
      >
        <img
          src="ssinfotech-logo.png"
          alt="SS Infotech Logo"
          className="w-3/4 max-w-md drop-shadow-lg"
        />
      </motion.div>

      {/* Right Side Login Form */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white shadow-2xl  p-8 w-[90%] md:w-[400px] mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">
          SS Infotech        </h2>
        <p className=" font-bold text-center text-blue-700 mb-6">
          Admin Login
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300  p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300  p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2  hover:bg-blue-700 transition-all shadow-md"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center text-gray-500 text-sm"
        >
          <p>Welcome back, Admin 👨‍💼</p>
          <p>Manage your dashboard smartly 💻</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
