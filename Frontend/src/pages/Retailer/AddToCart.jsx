import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  // Load cart data from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Update Grand Total whenever cart changes
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) =>
        sum + item.quantity * (item.pricing?.retailPriceWithTax || 0),
      0
    );
    setGrandTotal(total.toFixed(2));
  }, [cartItems]);

  // Update quantity in cart
  const updateQuantity = (itemId, value) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId
        ? { ...item, quantity: Math.max(1, parseInt(value) || 1) }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle Checkout for Saving Order to Backend
  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");

    const orderData = {
      items: cartItems,
      totalAmount: grandTotal,
      date: new Date().toISOString(),
    };

    try {
      console.log("Sending order data:", orderData);

      const response = await fetch("http://localhost:3300/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      console.log("Response received:", responseData);

      if (response.ok) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        setCartItems([]);
        navigate("/order-confirmation");
      } else {
        alert("Error placing order. Try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process order.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cartItems.map((item, index) => (
            <li
              key={item._id || item.productId || index}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "15px 0",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Product Name:</strong>{" "}
                {item.productName || "Unknown Product"}
              </p>
              <p>
                <strong>Product ID:</strong> {item.productId}
              </p>
              <p>
                <strong>Distributor ID:</strong> {item.distributorId}
              </p>

              {item.attributes && (
                <p>
                  <strong>Attributes:</strong>{" "}
                  {Object.entries(item.attributes).map(([key, value]) => (
                    <span key={`${item._id}-${key}`}>
                      {key}: {value} |{" "}
                    </span>
                  ))}
                </p>
              )}

              <p>
                <strong>Retail Price:</strong> ₹
                {item.pricing?.retailPriceWithTax}
              </p>

              <p>
                <strong>Quantity:</strong>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, e.target.value)}
                  style={{ width: "60px", marginLeft: "10px" }}
                />
              </p>

              <p>
                <strong>Total Price:</strong> ₹
                {(item.quantity * item.pricing?.retailPriceWithTax).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Grand Total Section */}
      {cartItems.length > 0 && (
        <div
          style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}
        >
          Grand Total: ₹{grandTotal}
        </div>
      )}

      {/* Proceed to Checkout Button */}
      {cartItems.length > 0 && (
        <button
          onClick={handleCheckout}
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Proceed to Checkout
        </button>
      )}

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CartPage;
