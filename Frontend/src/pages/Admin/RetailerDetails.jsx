// RetailerDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import AdminSidebar from "../../components/AdminSidebar";
import Header from "../../components/AdminHeader";
import axios from "axios";

const RetailerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [retailer, setRetailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchRetailerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/retailer-details/${id}`
        );
        setRetailer(response.data);
      } catch (error) {
        console.error("Error fetching retailer details:", error);
        setError("Failed to fetch retailer details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRetailerDetails();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3300/api/retailer-details/${id}`,
        retailer
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving retailer details:", error);
      setError("Failed to save retailer details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setRetailer((prevRetailer) => {
        const updatedRetailer = { ...prevRetailer };
        let current = updatedRetailer;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        return updatedRetailer;
      });
    } else {
      setRetailer((prevRetailer) => ({
        ...prevRetailer,
        [name]: value,
      }));
    }
  };

  const handleBack = () => {
    navigate("/view-retailers");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard flex">
      <AdminSidebar />
      <div className="main-content flex-1 ml-64 p-4">
        <Header />
        <div className="content mt-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleBack}
              className="flex items-center bg-purple-800 text-white p-3 rounded-full text-lg min-w-[120px]"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <div className="flex space-x-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-purple-800 text-white p-3 rounded-full text-lg min-w-[120px]"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-purple-800 text-white p-3 rounded-full text-lg min-w-[120px]"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Retailer Details</h1>
          <div className="retailer-details bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Retailer Information</h3>
            <form>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Full Name:</strong>
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={retailer.fullname || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Email:</strong>
                </label>
                <input
                  type="email"
                  name="email"
                  value={retailer.email || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Phone Number:</strong>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={retailer.phoneNumber || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Work Address:</strong>
                </label>
                <input
                  type="text"
                  name="workAddress"
                  value={retailer.workAddress || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Gender:</strong>
                </label>
                <input
                  type="text"
                  name="gender"
                  value={retailer.gender || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Role:</strong>
                </label>
                <input
                  type="text"
                  name="role"
                  value={retailer.role || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>User ID:</strong>
                </label>
                <input
                  type="text"
                  name="user"
                  value={retailer.user || ""}
                  readOnly
                  className="form-control"
                />
              </div>
              <div class Name="form-group mb-4">
                <label className="block font-medium">
                  <strong>Retailer ID:</strong>
                </label>
                <input
                  type="text"
                  name="_id"
                  value={retailer._id || ""}
                  readOnly
                  className="form-control"
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">
                Business Information
              </h3>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Business Name:</strong>
                </label>
                <input
                  type="text"
                  name="business.businessName"
                  value={retailer.business?.businessName || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Is Agreed:</strong>
                </label>
                <input
                  type="text"
                  value={retailer.business?.isAgreed ? "Yes" : "No"}
                  readOnly
                  className="form-control"
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">Business Details</h3>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Store Name:</strong>
                </label>
                <input
                  type="text"
                  name="businessDetails.storeName"
                  value={retailer.businessDetails?.storeName || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Product Category:</strong>
                </label>
                <input
                  type="text"
                  name="businessDetails.productCategory"
                  value={retailer.businessDetails?.productCategory || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Address Line 1:</strong>
                </label>
                <input
                  type="text"
                  name="businessDetails.addressLine1"
                  value={retailer.businessDetails?.addressLine1 || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Address Line 2:</strong>
                </label>
                <input
                  type="text"
                  name="businessDetails.addressLine2"
                  value={retailer.businessDetails?.addressLine2 || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>City:</strong>
                </label>
                <input
                  type="text"
                  name="businessDetails.city"
                  value={retailer.businessDetails?.city || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>State:</strong>
                </label>
                <input
                  type="text"
                  name="businessDetails.state"
                  value={retailer.businessDetails?.state || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Pincode:</strong>
                </label>
                <input
                  type="text"
                  name="businessDetails.pincode"
                  value={retailer.businessDetails?.pincode || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">Tax Details</h3>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Legal Name:</strong>
                </label>
                <input
                  type="text"
                  name="taxDetails.legalName"
                  value={retailer.taxDetails?.legalName || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>GST Number:</strong>
                </label>
                <input
                  type="text"
                  name="taxDetails.gstNumber"
                  value={retailer.taxDetails?.gstNumber || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>PAN Number:</strong>
                </label>
                <input
                  type="text"
                  name="taxDetails.panNumber"
                  value={retailer.taxDetails?.panNumber || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">Bank Details</h3>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Bank Name:</strong>
                </label>
                <input
                  type="text"
                  name="bankDetails.name"
                  value={retailer.bankDetails?.name || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Account Holder Name:</strong>
                </label>
                <input
                  type="text"
                  name="bankDetails.accountHolderName"
                  value={retailer.bankDetails?.accountHolderName || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Account Type:</strong>
                </label>
                <input
                  type="text"
                  name="bankDetails.accountType"
                  value={retailer.bankDetails?.accountType || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Account Number:</strong>
                </label>
                <input
                  type="text"
                  name="bankDetails.accountNumber"
                  value={retailer.bankDetails?.accountNumber || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>IFSC Code:</strong>
                </label>
                <input
                  type="text"
                  name="bankDetails.ifscCode"
                  value={retailer.bankDetails?.ifscCode || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">Created At:</h3>
              <input
                type="text"
                value={new Date(retailer.createdAt).toLocaleDateString()}
                readOnly
                className="form-control"
              />
              <h3 className="text-xl font-semibold mb-4">Updated At:</h3>
              <input
                type="text"
                value={new Date(retailer.updatedAt).toLocaleDateString()}
                readOnly
                className="form-control"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDetails;
