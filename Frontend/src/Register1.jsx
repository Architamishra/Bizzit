import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register1.css"; // Importing custom styles

const Register1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: "",
    productCategory: [],
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    navigate("/register2");
  };

  return (
    <div className="register-page">
      {/* Header with sections outside the form */}
      <div className="register-header">
        <div className="section completed">
          Otverification <span className="checkmark">✔</span>
        </div>
        <div className="section">
          About Business <span className="checkmark"></span>
        </div>
        <div className="section">
          Verification <span className="checkmark"></span>
        </div>
        <div className="section">
          Tax Details <span className="checkmark"></span>
        </div>
        <div className="section">Bank Details</div>
      </div>

      {/* Form Content */}
      <div className="register1-container">
        <div className="register1-box">
          <h1>Tell us about your business</h1>

          {/* Store Name */}
          <div className="form-field">
            <label>Store Name:</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
            />
          </div>

          {/* Product Category */}
          <div className="form-field category-label">
            <label>Category:</label>
            <div className="category-checkboxes">
              <label>
                <input
                  type="checkbox"
                  name="productCategory"
                  value="Electronics"
                  onChange={handleChange}
                />
                Electronics
              </label>
              <label>
                <input
                  type="checkbox"
                  name="productCategory"
                  value="Fashion"
                  onChange={handleChange}
                />
                Fashion
              </label>
              <label>
                <input
                  type="checkbox"
                  name="productCategory"
                  value="Furniture"
                  onChange={handleChange}
                />
                Furniture
              </label>
            </div>
          </div>

          {/* Business Address Label shifted to the right */}
          <div className="form-field business-address-label">
            <label>Business Address:</label>
          </div>

          {/* Address Lines */}
          <div className="address-container">
            <div className="address-field">
              <label>Address Line 1:</label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="address-field">
              <label>Address Line 2:</label>
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* City, State, Pincode */}
          <div className="location-details">
            <div className="location-field">
              <label>City:</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="location-field">
              <label>State:</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="location-field">
              <label>Pincode:</label>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Continue Button */}
          <button onClick={handleSubmit}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Register1;
