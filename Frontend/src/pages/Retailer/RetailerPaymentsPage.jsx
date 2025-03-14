import React from "react";
import RetailerSidebar from "../../components/SidebarRetailer";
import HeaderRetailer from "../../components/HeaderRetailer";

const RetailerPaymentsPage = () => {
  return (
    <div className="dashboard flex">
      <RetailerSidebar />
      <div className="main-content flex-1 ml-64 p-4">
        <HeaderRetailer />
        <div className="content mt-4">
          <h1>Retailer Payments</h1>
          <div>Retailer Payments Content</div>
        </div>
      </div>
    </div>
  );
};

export default RetailerPaymentsPage;
