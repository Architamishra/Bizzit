// pages/Retailer/RetailerProfilePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/SidebarRetailer";
import Header from "../../components/HeaderRetailer";

const RetailerProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    workAddress: "",
    businessName: "",
    storeName: "",
    productCategory: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    legalName: "",
    gstNumber: "",
    panNumber: "",
    bankName: "",
    accountHolderName: "",
    accountType: "",
    accountNumber: "",
    ifscCode: "",
    reEnterAccountNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("register1");

  useEffect(() => {
    if (!userId) {
      setError("User  ID is not available. Please log in.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/retailer/profile/${userId}`
        );
        const retailerData = response.data;

        setUserData({
          fullname: retailerData.fullname,
          email: retailerData.email,
          phoneNumber: retailerData.phoneNumber,
          workAddress: retailerData.workAddress,
          businessName: retailerData.business?.businessName || "",
          storeName: retailerData.businessDetails?.storeName || "",
          productCategory: retailerData.businessDetails?.productCategory || "",
          addressLine1: retailerData.businessDetails?.addressLine1 || "",
          addressLine2: retailerData.businessDetails?.addressLine2 || "",
          city: retailerData.businessDetails?.city || "",
          state: retailerData.businessDetails?.state || "",
          pincode: retailerData.businessDetails?.pincode || "",
          legalName: retailerData.taxDetails?.legalName || "",
          gstNumber: retailerData.taxDetails?.gstNumber || "",
          panNumber: retailerData.taxDetails?.panNumber || "",
          bankName: retailerData.bankDetails?.name || "",
          accountHolderName: retailerData.bankDetails?.accountHolderName || "",
          accountType: retailerData.bankDetails?.accountType || "",
          accountNumber: retailerData.bankDetails?.accountNumber || "",
          ifscCode: retailerData.bankDetails?.ifscCode || "",
          reEnterAccountNumber: retailerData.bankDetails?.accountNumber || "",
        });
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `http://localhost:3300/api/retailer/profile/${userId}`,
        {
          fullname: userData.fullname,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          workAddress: userData.workAddress,
          business: {
            businessName: userData.businessName,
            isAgreed: true,
          },
          businessDetails: {
            storeName: userData.storeName,
            productCategory: userData.productCategory,
            addressLine1: userData.addressLine1,
            addressLine2: userData.addressLine2,
            city: userData.city,
            state: userData.state,
            pincode: userData.pincode,
          },
          taxDetails: {
            legalName: userData.legalName,
            gstNumber: userData.gstNumber,
            panNumber: userData.panNumber,
            state: userData.state,
          },
          bankDetails: {
            name: userData.bankName,
            accountHolderName: userData.accountHolderName,
            accountType: userData.accountType,
            accountNumber: userData.accountNumber,
            reEnterAccountNumber: userData.reEnterAccountNumber,
            ifscCode: userData.ifscCode,
          },
        }
      );
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="content flex-1 p-6 mt-20 ml-60">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Retailer Profile</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="tabs flex border-b border-gray-300 mb-4">
          <button
            onClick={() => setActiveTab("personal")}
            className={`tab py-2 px-4 font-semibold ${
              activeTab === "personal"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab("business")}
            className={`tab py-2 px-4 font-semibold ${
              activeTab === "business"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Business Details
          </button>
          <button
            onClick={() => setActiveTab("tax")}
            className={`tab py-2 px-4 font-semibold ${
              activeTab === "tax"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Tax Details
          </button>
          <button
            onClick={() => setActiveTab("bank")}
            className={`tab py-2 px-4 font-semibold ${
              activeTab === "bank"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Bank Details
          </button>
        </div>

        <form onSubmit={handleUpdate}>
          {activeTab === "personal" && (
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="fullname"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={userData.fullname}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
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
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="workAddress"
                >
                  Work Address
                </label>
                <input
                  type="text"
                  id="workAddress"
                  name="workAddress"
                  value={userData.workAddress}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>
          )}

          {activeTab === "business" && (
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="businessName"
                >
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={userData.businessName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="storeName"
                >
                  Store Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={userData.storeName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="productCategory"
                >
                  Product Category
                </label>
                <input
                  type="text"
                  id="productCategory"
                  name="productCategory"
                  value={userData.productCategory}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="addressLine1"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={userData.addressLine1}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="addressLine2"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={userData.addressLine2}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={userData.state}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="pincode"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={userData.pincode}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>
          )}

          {activeTab === "tax" && (
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="legalName"
                >
                  Legal Name
                </label>
                <input
                  type="text"
                  id="legalName"
                  name="legalName"
                  value={userData.legalName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="gstNumber"
                >
                  GST Number
                </label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  value={userData.gstNumber}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="panNumber"
                >
                  PAN Number
                </label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={userData.panNumber}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>
          )}

          {activeTab === "bank" && (
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="bankName"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={userData.bankName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="accountHolderName"
                >
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="accountHolderName"
                  name="accountHolderName"
                  value={userData.accountHolderName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="accountType"
                >
                  Account Type
                </label>
                <input
                  type="text"
                  id="accountType"
                  name="accountType"
                  value={userData.accountType}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="accountNumber"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={userData.accountNumber}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="ifscCode"
                >
                  IFSC Code
                </label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={userData.ifscCode}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-4">
            {isEditing ? (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }} // Prevent form submission and enable editing
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RetailerProfilePage;
