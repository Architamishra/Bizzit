import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3300/login/admin", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Check if the user is an admin
      if (user && user.role === "admin") {
        localStorage.clear();
        localStorage.setItem("jwtToken", token); // for Storing the JWT token
        localStorage.setItem("register1", user.userId); // for Storing user ID

        setLoading(false);
        navigate("/admin-dashboard"); // Navigate to the admin dashboard
      } else {
        throw new Error("Unauthorized. Please log in as Admin.");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Continue"}
          </button>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
