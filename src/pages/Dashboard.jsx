import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

const Dashboard = ({ shopItems, todayOrderData }) => {
  const [salesData, setSalesData] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  const [revenueData, setRevenueData] = useState({});

  useEffect(() => {

    const salesByDate = calculateSalesByDate(shopItems);

  
    const inventory = calculateInventory(shopItems);

    const revenue = calculateTotalRevenue(shopItems);


    setSalesData(salesByDate);
    setInventoryData(inventory);
    setRevenueData(revenue);
  }, [shopItems]);

  const calculateSalesByDate = (items) => {


    const salesByDate = {
      
    };

    return salesByDate;
  };

  const calculateInventory = (items) => {


    const inventory = {
      
    };

    return inventory;
  };

  const calculateTotalRevenue = (items) => {


    const totalRevenue = {
    };

    return totalRevenue;
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  return (
    <div>
      <h2>Thống kê doanh số bán ra</h2>
      <Line data={salesData} options={options} />

      <h2>Thống kê hàng tồn</h2>
      <Bar data={inventoryData} options={options} />

      <h2>Tổng doanh thu</h2>
      <Line data={revenueData} options={options} />

      {todayOrderData && (
        <div>
          <h2>Thông tin đơn hàng ngày hôm nay</h2>
          <p>ID Đơn hàng: {todayOrderData.id}</p>
          <p>Ngày đặt hàng: {todayOrderData.orderDate}</p>
          <p>Tổng số tiền: {todayOrderData.total}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
