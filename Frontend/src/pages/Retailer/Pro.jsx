import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";

const ProductPage = () => {
  const { distributorId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!distributorId || distributorId.length !== 24) {
          setError("❌ Invalid Distributor ID format");
          return;
        }

        const response = await axios.get(
          `http://localhost:3300/api/products/${distributorId}`
        );
        setProducts(response.data);
        setError("");
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setError(error.response?.data?.message || "Something went wrong!");
      }
    };

    fetchProducts();
  }, [distributorId]);

  const toggleExpand = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const handleQuantityChange = (variantId, value) => {
    const quantity = Math.max(0, parseInt(value) || 0);
    setQuantities((prev) => ({ ...prev, [variantId]: quantity }));
  };

  const handleBuyNow = async (variant, product) => {
    console.log("🔍 Checking required fields before placing order...");
    console.log("Variant:", variant);
    console.log("Product:", product);

    if (!variant?._id) {
      console.error("❌ Missing Variant ID!", variant);
      alert("❌ Missing Variant details!");
      return;
    }

    if (!product?._id) {
      console.error("❌ Missing Product ID!", product);
      alert("❌ Missing Product details!");
      return;
    }

    if (!variant?.pricing?.retailPriceWithTax) {
      console.error("❌ Missing Pricing Details!", variant);
      alert("❌ Price details missing for this variant!");
      return;
    }

    const quantity = quantities?.[variant._id] || 1;
    console.log("Selected Quantity:", quantity);

    if (quantity <= 0) {
      console.error("❌ Invalid Quantity!", { quantity });
      alert("❌ Quantity must be at least 1!");
      return;
    }

    const retailerId = localStorage.getItem("register1");
    const retailerName = localStorage.getItem("retailerName");

    console.log("Retailer ID:", retailerId);
    console.log("Retailer Name:", retailerName);

    if (!retailerId || !retailerName) {
      console.error("❌ Retailer details missing! Please log in again.", {
        retailerId,
        retailerName,
      });
      alert("❌ Retailer details missing! Please log in again.");
      return;
    }

    const orderData = {
      productId: product._id,
      productName: product.productName,
      distributorId: product.distributorId,
      retailerId,
      retailerName,
      attributes: variant.attributes,
      variantId: variant._id,
      pricing: { retailPriceWithTax: variant.pricing.retailPriceWithTax },
      quantity,
      cgst: variant.pricing?.cgst || 0,
      sgst: variant.pricing?.sgst || 0,
    };

    console.log("🛒 Order Data Ready:", orderData);

    try {
      const response = await axios.post(
        "http://localhost:3300/api/orders",
        orderData
      );
      const { razorpayOrder } = response.data;

      // Initialize Razorpay
      const options = {
        key: "rzp_test_bWCrBPFrJXgT5W", // Your Razorpay Key ID
        amount: razorpayOrder.amount, // Amount in paise
        currency: razorpayOrder.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          // Verify payment
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            orderId: razorpayOrder.id,
          };

          try {
            const verifyResponse = await axios.post(
              "http://localhost:3300/api/orders/verify-payment",
              paymentData
            );

            // Only place the order if payment verification is successful
            if (verifyResponse.data.order) {
              alert(
                "✅ Payment successful! Order ID: " +
                  verifyResponse.data.order._id
              );
            }
          } catch (error) {
            console.error(" Payment verification failed:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: retailerName,
          email: localStorage.getItem("retailerEmail"),
          contact: localStorage.getItem("retailerPhoneNumber"),
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to place order. Try again.");
    }
  };

  const handleAddToCart = async (variant, product) => {
    console.log("Adding to cart:", variant); // Debugging

    if (!variant.pricing || variant.pricing.retailPriceWithTax === undefined) {
      alert(" Price data missing for this product variant!");
      return;
    }

    const quantity = quantities[variant._id] || 1;
    const retailerId = localStorage.getItem("register1"); // Retailer ID
    const retailerName = localStorage.getItem("retailerName");

    if (!retailerId || !retailerName) {
      alert(" Retailer details missing! Please log in again.");
      return;
    }

    const cartItem = {
      productId: product._id,
      productName: product.productName,
      distributorId: product.distributorId,
      retailerId,
      retailerName,
      variantId: variant._id,
      attributes: variant.attributes,
      pricing: {
        retailPriceWithTax: variant.pricing.retailPriceWithTax,
      },
      quantity,
    };

    try {
      const response = await axios.post(
        "http://localhost:3300/api/cart",
        cartItem
      );
      alert(`🛒 Added ${quantity} of ${variant.attributes.Volume} to cart`);
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      alert("❌ Failed to add item to cart in database!");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "right", margin: "10px" }}>
        <FaShoppingCart
          size={28}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        />
      </div>

      <h1>Products</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li
              key={product._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Product Name:</strong> {product.productName}
              </p>
              <p>
                <strong>Packaging Type:</strong> {product.packagingType}
              </p>
              <button onClick={() => toggleExpand(product._id)}>
                {expandedProduct === product._id ? "Hide Details" : "View More"}
              </button>

              {expandedProduct === product._id && (
                <div style={{ marginTop: "10px" }}>
                  <p>
                    <strong>Product ID:</strong> {product._id}
                  </p>
                  <p>
                    <strong>Distributor ID:</strong> {product.distributorId}
                  </p>

                  <strong>Variants:</strong>
                  {product.variants?.length > 0 ? (
                    <ul>
                      {product.variants.map((variant) => (
                        <li key={variant._id}>
                          <p>
                            <strong>Volume:</strong>{" "}
                            {variant.attributes?.Volume}
                          </p>
                          <p>
                            <strong>Color:</strong> {variant.attributes?.Color}
                          </p>

                          <strong>Pricing:</strong>
                          <ul>
                            <li>
                              Retail Price: ₹
                              {variant.pricing?.retailPriceWithTax}
                            </li>
                            <li>
                              Quantity:
                              <input
                                type="number"
                                value={quantities[variant._id] || 0}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    variant._id,
                                    e.target.value
                                  )
                                }
                              />
                            </li>
                            <li>
                              <strong>Total: ₹</strong>
                              {(
                                (quantities[variant._id] || 0) *
                                variant.pricing?.retailPriceWithTax
                              ).toFixed(2)}
                            </li>
                          </ul>

                          <button
                            onClick={() => handleBuyNow(variant, product)}
                          >
                            Buy Now
                          </button>
                          <button
                            onClick={() => handleAddToCart(variant, product)}
                          >
                            Add to Cart
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No Variants Available</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductPage;
