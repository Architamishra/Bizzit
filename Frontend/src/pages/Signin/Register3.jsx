import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register3 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    state: "",
    legalName: "",
    gstNumber: "",
    panNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      formData.state &&
      formData.legalName &&
      formData.gstNumber &&
      formData.panNumber
    ) {
      console.log("Form Data Submitted:", formData);

      let existingData = JSON.parse(localStorage.getItem("register")) || [];

      while (existingData.length < 4) {
        existingData.push(null);
      }

      existingData[3] = { register3Data: formData };

      localStorage.setItem("register", JSON.stringify(existingData));

      navigate("/register4");
    } else {
      alert("Please fill in all fields before continuing.");
    }
  };

  return (
    <div className="tax-details-page">
      <div className="tax-details-container">
        <div className="register-header">
          <div className="section completed">
            Terms & Conditions <span className="checkmark">✔</span>
          </div>
          <div className="section completed">
            About Business <span className="checkmark">✔</span>
          </div>

          <div className="section">
            Tax Details <span className="checkmark"></span>
          </div>
          <div className="section">Bank Details</div>
        </div>
        <div className="tax-details-box">
          <h1>Tax Details</h1>
          <h3>Enter your tax details</h3>

          <div className="form-field">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter State"
            />
          </div>

          <div className="form-field">
            <label>Your Legal Name:</label>
            <input
              type="text"
              name="legalName"
              value={formData.legalName}
              onChange={handleChange}
              placeholder="Enter Your Legal Name"
            />
          </div>

          <div className="form-field">
            <label>GST Number:</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="Enter GST Number"
            />
          </div>

          <div className="form-field">
            <label>PAN Number:</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN Number"
            />
          </div>

          <button onClick={handleSubmit} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register3;
