import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubscriptionPlans({ onPlanSelect }) {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: "Monthly Plan",
      description: "Access for one month.",
      price: 750,
      billingCycle: "month",
    },
    {
      id: 2,
      name: "Yearly Plan",
      description: "Access for one year.",
      price: 7500,
      billingCycle: "year",
    },
  ];

  const handlePayment = async (plan) => {
    console.log("Payment initiated for plan:", plan);

    const today = new Date();
    const startDate = new Date(today);
    let endDate;
    let nextBillingDate;

    if (plan.billingCycle === "month") {
      endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + 1);

      nextBillingDate = new Date(endDate);
    } else if (plan.billingCycle === "year") {
      endDate = new Date(today);
      endDate.setFullYear(endDate.getFullYear() + 1);

      nextBillingDate = new Date(endDate);
    }

    const subscriptionData = {
      status: "active",
      type: plan.billingCycle === "month" ? "Monthly" : "Yearly",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      nextBillingDate: nextBillingDate.toISOString(),
    };

    // Retrieve user ID from local storage
    const userId = localStorage.getItem("register1");
    console.log("Retrieved user ID from local storage:", userId);

    try {
      console.log("Sending subscription data to server:", {
        userId,
        subscription: subscriptionData,
      });

      const response = await axios.put(
        "http://localhost:3300/api/subscription/update-subscription",
        {
          userId,
          subscription: subscriptionData,
        }
      );

      onPlanSelect(plan.id);
      console.log("Subscription updated successfully:", response.data);

      console.log("Navigating to /logindistributor...");
      window.location.href = "/logindistributor";
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 p-4">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Uh-Oh! It looks like you are not subscribed or your subscription plan
        expired. <br /> Choose Your Subscription Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">
              {plan.name}
            </h2>
            <p className="text-gray-700 mb-4">{plan.description}</p>
            <p className="text-lg font-bold text-purple-800 mb-4">{`₹${plan.price} / ${plan.billingCycle}`}</p>
            <button
              onClick={() => handlePayment(plan)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlans;
