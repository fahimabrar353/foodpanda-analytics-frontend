import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import axios from "axios";

import "./App.css";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function App() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/order")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => new Date(a.order_time) - new Date(b.order_time)
        );
        setOrderData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];

    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const getOrderCounts = () => {
    const orderCounts = {};
    orderData.forEach((order) => {
      const restaurantName = order.restaurant.restaurant_name;
      if (!orderCounts[restaurantName]) {
        orderCounts[restaurantName] = 0;
      }
      orderCounts[restaurantName]++;
    });
    return orderCounts;
  };

  const orderCounts = getOrderCounts();
  const doughnutLabels = Object.keys(orderCounts);
  const doughnutData = Object.values(orderCounts);

  //================================================================================================

  const generateDataset = () => {
    const labels = [];
    const data = [];

    // Create an object to map order dates to their aggregated total values
    const orderMap = orderData.reduce((acc, curr) => {
      const date = formatDate(curr.order_time);
      if (acc[date]) {
        acc[date] += curr.total_value;
      } else {
        acc[date] = curr.total_value;
      }
      return acc;
    }, {});

    // Iterate over a range of dates to cover all possible dates
    const startDate = new Date(orderData[0].order_time);
    const endDate = new Date(orderData[orderData.length - 1].order_time);

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = formatDate(date);
      labels.push(formattedDate);
      data.push(orderMap[formattedDate] || null); // Push null if data is not available for that date
    }

    return { labels, data };
  };

  const { labels, data } = generateDataset();

  //================================================================================================

  return (
    <div className="App">
      <div className="dataCard largeCard">
        <Line
          data={{
            labels: orderData.map((data) => formatDate(data.order_time)),
            datasets: [
              {
                label: "Sub Total",
                data: orderData.map((data) => data.subtotal),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              {
                label: "Total Value",
                data: orderData.map((data) => data.total_value),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly spendings",
              },
            },
          }}
        />
      </div>

      <div className="dataCard largeCard">
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "Total Value",
                data: data,
                backgroundColor: "rgb(136, 191, 77)",
                borderColor: "rgb(136, 191, 77)",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Ordered items by date",
              },
            },
          }}
        />
      </div>

      <div className="dataCard orderCard">
        <Bar
          data={{
            labels: orderData.map((data) => data.restaurant.restaurant_name),
            datasets: [
              {
                label: "Price",
                data: orderData.map((data) => data.subtotal),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Ordered items",
              },
            },
          }}
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: doughnutLabels,
            datasets: [
              {
                label: "Order Count",
                data: doughnutData,
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(100, 200, 255, 0.8)",
                  "rgba(255, 200, 100, 0.8)",
                  "rgba(150, 100, 255, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(100, 200, 255, 0.8)",
                  "rgba(255, 200, 100, 0.8)",
                  "rgba(150, 100, 255, 0.8)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Ordered from Restaurant",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
