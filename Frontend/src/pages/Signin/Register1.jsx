import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: "",
    productCategory: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
  });

  const [completedSections, setCompletedSections] = useState({
    termsAndConditions: true,
    business: false,
    taxDetails: false,
    bankDetails: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);

    let existingData = JSON.parse(localStorage.getItem("register")) || [];

    while (existingData.length < 4) {
      existingData.push(null);
    }

    existingData[2] = { register1Data: formData };

    localStorage.setItem("register", JSON.stringify(existingData));

    setCompletedSections((prevState) => ({
      ...prevState,
      business: true,
      verification: true,
    }));

    navigate("/register3");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[800px] max-w-full">
        <h1 className="text-5xl font-bold mb-8 text-center font-serif">Tell us about your business</h1>

        <div className="register-header mb-6">
          <div className={`section completed`}>
            Terms & Conditions <span className="checkmark">✔</span>
          </div>
          <div className={`section ${completedSections.business ? "completed" : ""}`}>
            About Business{" "}
            <span className={completedSections.business ? "checkmark" : ""}>✔</span>
          </div>
          <div className={`section ${completedSections.taxDetails ? "completed" : ""}`}>
            Tax Details{" "}
            <span className={completedSections.taxDetails ? "checkmark" : ""}>✔</span>
          </div>
          <div className={`section ${completedSections.bankDetails ? "completed" : ""}`}>
            Bank Details{" "}
            <span className={completedSections.bankDetails ? "checkmark" : ""}>✔</span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 gap-y-6">
          {/* Store Name */}
          <div className="flex flex-col">
            <label className="font-medium">Store Name:</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>

          {/* Product Category */}
          <div className="flex flex-col">
            <label className="font-medium">Category:</label>
            <input
              type="text"
              name="productCategory"
              placeholder="Enter your category"
              value={formData.productCategory}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>

          {/* Business Address */}
          <div className="form-field business-address-label">
            <label className="font-medium">Business Address:</label>
          </div>

          <div className="address-container">
            <div className="address-field">
              <label className="font-medium">Address Line 1:</label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="address-field">
              <label className="font-medium">Address Line 2:</label>
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
 </div>

            <div className="location-details grid grid-cols-3 gap-4">
              <div className="location-field">
                <label className="font-medium">City:</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="location-field">
                <label className="font-medium">State:</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="location-field">
                <label className="font-medium">Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white font-bold p-2 rounded-md w-full mt-6"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    
  );
};

export default Register1;