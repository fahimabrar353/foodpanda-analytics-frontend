import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";
import "./Heatmap.css";

const Heatmap = ({ heatmapData }) => {
  const getClassForValue = (value) => {
    if (!value) {
      return "color-empty";
    }
    const amount = value.amount;
    if (amount === 0) return "color-empty";
    if (amount >= 1 && amount <= 100) return "color-scale-1";
    if (amount > 100 && amount <= 200) return "color-scale-2";
    if (amount > 200 && amount <= 300) return "color-scale-3";
    if (amount > 300 && amount <= 400) return "color-scale-4";
    if (amount > 400 && amount <= 500) return "color-scale-5";
    if (amount > 500 && amount <= 600) return "color-scale-6";
    if (amount > 600 && amount <= 700) return "color-scale-7";
    if (amount > 700 && amount <= 800) return "color-scale-8";
    if (amount > 800 && amount <= 900) return "color-scale-9";
    if (amount > 900) return "color-scale-10";
  };

  return (
    <div className="dataCad largeCard">
      <h2>Order Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date("2023-06-01")}
        endDate={new Date("2024-06-31")}
        values={heatmapData}
        classForValue={getClassForValue}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": value ? `${value.date}: ${value.amount}` : "No data",
          };
        }}
        showWeekdayLabels={true}
        onClick={(value) => alert(` ${value.date} Ordered ${value.amount}`)}
      />
    </div>
  );
};

export default Heatmap;
