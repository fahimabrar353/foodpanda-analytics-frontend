import HeatMap from "@uiw/react-heat-map";
import Tooltip from "@uiw/react-tooltip";
import React from "react";

const getColor = (amount) => {
  if (amount === 0) {
    return "#ffffff";
  } else if (amount < 400) {
    const greenIntensity = Math.min(255, Math.floor((amount / 400) * 255));
    return `rgb(0, ${greenIntensity}, 0)`; // green gradient
  } else if (amount <= 1000) {
    const ratio = (amount - 400) / 600;
    const redIntensity = Math.min(255, Math.floor(ratio * 255));
    const greenIntensity = 255 - redIntensity;
    return `rgb(${redIntensity}, ${greenIntensity}, 0)`; // gradient from green to red
  } else {
    return "#ff0000"; // red for 1000 or greater
  }
};

const Heatmap = ({ heatmapData }) => {
  return (
    <div className="largeCard dataCard">
      <HeatMap
        value={heatmapData}
        width={1000}
        startDate={new Date("2023/08/01")}
        rectRender={(props, data) => {
          const color = getColor(data.amount || 0);
          return (
            <Tooltip
              placement="top"
              content={`Date: ${data.date} amount: ${data.amount || 0}`}
            >
              <rect {...props} fill={color} />
            </Tooltip>
          );
        }}
        panelColors={{}}
      />
    </div>
  );
};

export default Heatmap;
