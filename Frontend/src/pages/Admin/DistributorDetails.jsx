import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import AdminSidebar from "../../components/AdminSidebar";
import Header from "../../components/AdminHeader";
import axios from "axios";

const DistributorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [distributor, setDistributor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDistributorDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/distributor-details/${id}`
        );
        setDistributor(response.data);
      } catch (error) {
        console.error("Error fetching distributor details:", error);
        setError("Failed to fetch distributor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDistributorDetails();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3300/api/distributor-details/${id}`,
        distributor
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving distributor details:", error);
      setError("Failed to save distributor details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setDistributor((prevDistributor) => {
        const updatedDistributor = { ...prevDistributor };
        let current = updatedDistributor;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        return updatedDistributor;
      });
    } else {
      setDistributor((prevDistributor) => ({
        ...prevDistributor,
        [name]: value,
      }));
    }
  };

  const handleBack = () => {
    navigate("/view-distributors");
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
          <h1 className="text-2xl font-bold mb-4">Distributor Details</h1>
          <div className="distributor-details bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Distributor Information
            </h3>
            <form>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Full Name:</strong>
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={distributor.fullname || ""}
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
                  value={distributor.email || ""}
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
                  value={distributor.phoneNumber || ""}
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
                  value={distributor.workAddress || ""}
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
                  value={distributor.gender || ""}
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
                  value={distributor.role || ""}
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
                  value={distributor.user || ""}
                  readOnly
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block font-medium">
                  <strong>Distributor ID:</strong>
                </label>
                <input
                  type="text"
                  name="_id"
                  value={distributor._id || ""}
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
                  value={distributor.business?.businessName || ""}
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
                  value={distributor.business?.isAgreed ? "Yes" : "No"}
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
                  value={distributor.businessDetails?.storeName || ""}
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
                  value={distributor.businessDetails?.productCategory || ""}
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
                  value={distributor.businessDetails?.addressLine1 || ""}
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
                  value={distributor.businessDetails?.addressLine2 || ""}
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
                  value={distributor.businessDetails?.city || ""}
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
                  value={distributor.businessDetails?.state || ""}
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
                  value={distributor.businessDetails?.pincode || ""}
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
                  value={distributor.taxDetails?.legalName || ""}
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
                  value={distributor.taxDetails?.gstNumber || ""}
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
                  value={distributor.taxDetails?.panNumber || ""}
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
                  value={distributor.bankDetails?.name || ""}
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
                  value={distributor.bankDetails?.accountHolderName || ""}
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
                  value={distributor.bankDetails?.accountType || ""}
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
                  value={distributor.bankDetails?.accountNumber || ""}
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
                  value={distributor.bankDetails?.ifscCode || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="form-control"
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">Created At:</h3>
              <input
                type="text"
                value={new Date(distributor.createdAt).toLocaleDateString()}
                readOnly
                className="form-control"
              />
              <h3 className="text-xl font-semibold mb-4">Updated At:</h3>
              <input
                type="text"
                value={new Date(distributor.updatedAt).toLocaleDateString()}
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

export default DistributorDetails;
