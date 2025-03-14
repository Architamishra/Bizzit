import React from "react";
import Layout from "../components/Layout"; // Import the Layout component


const Dashboard = () => {
  return (
    <Layout>
      {/* Page-specific content */}
      <div className="content mt-4">
        <OrdersTable />
        <PaymentTable />
      </div>
    </Layout>
  );
};

export default Dashboard;
