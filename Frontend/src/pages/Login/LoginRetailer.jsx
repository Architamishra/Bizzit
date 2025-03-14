import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginRetailer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3300/login/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Check if the user is a retailer
      if (user && user.userId && user.role === "retailer") {
        localStorage.clear(); // for Clearing old data
        localStorage.setItem("jwtToken", token); // Store the JWT token
        localStorage.setItem("register1", user.userId); // Store user ID
        localStorage.setItem("retailerName", user.fullname || "Retailer"); // Store retailer name
        localStorage.setItem("email", email); // Store email in local storage

        setLoading(false);
        navigate("/retailer/retailer-dashboard"); // Navigate to the retailer dashboard
      } else {
        throw new Error("Invalid role. Please login as Retailer.");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || "Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Retailer Login</h1>
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
          <div className="text-center mt-4">
            <div className="flex items-center justify-center mb-2">
              <div className="w-1/4 border-t border-gray-400"></div>
              <p className="mx-2 text-gray-600">or</p>
              <div className="w-1/4 border-t border-gray-400"></div>
            </div>
            <button className="w-full flex items-center justify-center bg-white border py-2 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <img src="Google.png" alt="Google" className="w-5 h-5 mr-2" />{" "}
              Continue with Google
            </button>
          </div>
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
}

export default LoginRetailer;
