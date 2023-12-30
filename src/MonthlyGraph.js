import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Custom tooltip for the graph
const CustomTooltip = ({ active, payload, label }) => {
  // Only show tooltip if there's active data
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>Date: {label}</p>
        <p>${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};

// Component for displaying a monthly graph
function MonthlyGraph({ preproccesedData }) {
  // State for storing the processed data
  const [postProcessedData, setpostProcessedData] = useState([]);

  // Process the data when it changes
  useEffect(() => {
    // Only process if there's data
    if (preproccesedData) {
      // Transform the data into a format suitable for the graph
      const transformedData = Object.entries(
        preproccesedData["Monthly Adjusted Time Series"]
      )
        .map(([date, values]) => {
          // Parse the date and format it as "month/year"
          const parsedDate = new Date(date);
          const formattedTime =
            parsedDate.getMonth() +
            1 +
            "/" +
            parsedDate.getFullYear().toString().substr(-2);
          return {
            date: formattedTime,
            close: parseFloat(values["4. close"]),
          };
        })
        .reverse(); // Reverse the data so it's in chronological order
      setpostProcessedData(transformedData);
    }
  }, [preproccesedData]);

  // Render the graph
  return (
    <div className="App">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={postProcessedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="close" stroke="#2451B7" fill="url(#color)" />
          <CartesianGrid opacity={0.1} fillOpacity={0.1} vertical={false} />
          <XAxis dataKey="date" />
          <YAxis
            tickCount={9}
            axisLine={false}
            domain={["dataMin", "dataMax"]}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyGraph;
