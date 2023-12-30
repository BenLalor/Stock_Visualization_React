import React, { useState, useEffect } from "react";
import { ResponsiveContainer } from "recharts";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
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

// Component for displaying a dividend graph
function DividendGraph({ preproccesedData }) {
  // State for storing the processed data
  const [data, setData] = useState([]);

  // Process the data when it changes
  useEffect(() => {
    // Only process if there's data
    if (preproccesedData) {
      console.log("preproccessed data: " + preproccesedData);
      // Transform the data into a format suitable for the graph
      const monthlyAdjustedTimeSeries =
        preproccesedData["Monthly Adjusted Time Series"];

      let transformedData = {};
      for (let year in monthlyAdjustedTimeSeries) {
        transformedData[year] =
          monthlyAdjustedTimeSeries[year]["7. dividend amount"];
      }
      transformedData = Object.entries(transformedData)
        .map(([date, value]) => ({
          date: new Date(date).getFullYear(), // get the year from the date
          value: parseFloat(value),
        }))
        .filter((item) => item.value !== 0.0) // filter out objects with 0.000 dividend amount
        .reverse(); // Reverse the data so it's in chronological order

      setData(transformedData);
    }
  }, [preproccesedData]);

  // Function to remove months with no dividends
  function removeNonDividendMonths(data) {
    return data.filter((dataPoint) => dataPoint.value > 0);
  }

  // Render the graph
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid opacity={0.5} vertical={false} />
        <XAxis dataKey="date" />
        <YAxis
          axisLine={false}
          tickCount={9}
          tickFormatter={(tickItem) => `$${tickItem}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="value"
          fill="#2451B7"
          opacity={0.5}
          barSize={20}
          barGap={5}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DividendGraph;
