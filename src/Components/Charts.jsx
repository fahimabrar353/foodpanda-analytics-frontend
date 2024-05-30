import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "../App.css";

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

function MonthlySpendingsChart({ orderData }) {
  return (
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
  );
}

function OrderedItemsByDateChart({ labels, data }) {
  return (
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
  );
}

function OrderedItemsChart({ orderData }) {
  return (
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
  );
}

function OrderedFromRestaurantChart({ doughnutLabels, doughnutData }) {
  return (
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
  );
}

export {
  MonthlySpendingsChart,
  OrderedItemsByDateChart,
  OrderedItemsChart,
  OrderedFromRestaurantChart,
};
