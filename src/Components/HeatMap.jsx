import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./Heatmap.css";

const Heatmap = ({ heatmapData }) => {
  return (
    <div className="dataCad largeCard">
      <h2>Order Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date("2023-06-01")}
        endDate={new Date("2024-6-31")}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": value ? `${value.date}: ${value.count}` : "No data",
          };
        }}
        showWeekdayLabels={true}
        onClick={(value) => alert(` ${value.date} Ordered ${value.count}`)}
      />
    </div>
  );
};

export default Heatmap;
