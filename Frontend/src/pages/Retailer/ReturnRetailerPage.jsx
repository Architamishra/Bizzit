import React, { useState, useEffect } from "react";

const ReturnPage = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await fetch("http://localhost:3300/api/returns");
        const data = await response.json();
        setReturns(data);
      } catch (error) {
        console.error("Error fetching returns:", error);
      }
    };
    fetchReturns();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Return Requests</h1>

      <h2>Return Requested</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Order Date</th>
            <th>Reason</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {returns
            .filter((item) => item.acceptanceStatus === "Pending")
            .map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.orderDate}</td>
                <td>{item.reason}</td>
                <td>{item.returnDate}</td>
                <td>{item.acceptanceStatus}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Return Accepted</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Order Date</th>
            <th>Reason</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {returns
            .filter((item) => item.acceptanceStatus === "Accepted")
            .map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.orderDate}</td>
                <td>{item.reason}</td>
                <td>{item.returnDate}</td>
                <td>{item.acceptanceStatus}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnPage;
