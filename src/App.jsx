import React, { useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import axios from "axios";

import "./App.css";
import {
  MonthlySpendingsChart,
  OrderedFromRestaurantChart,
  OrderedItemsByDateChart,
  OrderedItemsChart,
} from "./Components/Charts";
import Heatmap from "./Components/HeatMap";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const sampleData = [
  { date: "2024-01-01", count: 1 },
  { date: "2024-01-02", count: 4 },
  { date: "2024-01-03", count: 2 },
  { date: "2024-01-04", count: 1 },
  { date: "2024-01-05", count: 3 },
  { date: "2024-01-31", count: 2 },
  { date: "04-04-2024", count: 4 },
  { date: "2024-03-02", count: 2 },
];

function App() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/order")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => new Date(a.order_time) - new Date(b.order_time)
        );
        setOrderData(sortedData);
        setLoading(false);
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

  const formatDateForHeatMap = (dateString) => {
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
    return `${month}-${day}-${year}`;
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

  //================================================================================================

  const orderCounts = getOrderCounts();
  const doughnutLabels = Object.keys(orderCounts);
  const doughnutData = Object.values(orderCounts);

  //================================================================================================

  const generateDataset = () => {
    if (!orderData.length) return { labels: [], data: [] };

    const labels = [];
    const data = [];

    // Create an object to map order dates to sum total_values
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

  //make combined object for heatmap from label and data
  const heatmapData = labels.map((label, index) => {
    return {
      date: formatDateForHeatMap(label),
      amount: data[index] || 0,
    };
  });

  //================================================================================================

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MonthlySpendingsChart orderData={orderData} />

          {/* ============== Heat Map ======================================================= */}
          <Heatmap heatmapData={heatmapData} />

          <OrderedItemsByDateChart labels={labels} data={data} />
          <OrderedItemsChart orderData={orderData} />
          <OrderedFromRestaurantChart
            doughnutLabels={doughnutLabels}
            doughnutData={doughnutData}
          />
        </>
      )}
    </div>
  );
}

export default App;
