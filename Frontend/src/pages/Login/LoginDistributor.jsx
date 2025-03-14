import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SubscriptionPlans from "../../components/SubscriptionPlans"; // SubscriptionPlans component import

function LoginDistributor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false); // State to show plans
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:3300/login/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // for Checking if the user is a distributor
      if (user && user.role === "distributor") {
        //for Checking subscription status
        if (user.subscription.status === "expired") {
          localStorage.setItem("register1", user.userId);
          setShowPlans(true); // Show subscription plans
          setError(""); // Remove error message
          setLoading(false);
          return;
        }

        localStorage.clear();
        localStorage.setItem("jwtToken", token); // Store JWT token
        localStorage.setItem("register1", user.userId); // Store distributor ID
        localStorage.setItem("email", user.email); // Store email ID
        localStorage.setItem("distributorName", user.fullname); // Store distributor name

        setLoading(false);
        navigate("/distributor-dashboard"); // Navigate to dashboard
      } else {
        throw new Error("Unauthorized. Please log in as Distributor.");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  const handlePlanSelect = (planId) => {
    console.log(`Proceeding to payment for plan ID: ${planId}`);
  };

  // Render Subscription Plans if showPlans is true
  if (showPlans) {
    return <SubscriptionPlans onPlanSelect={handlePlanSelect} />;
  }

  // Render the login form if showPlans is false
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          Distributor Login
        </h1>
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
}

export default LoginDistributor;
