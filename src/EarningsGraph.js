import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Custom tooltip for the earnings graph
const CustomTooltip = ({ active, payload, label }) => {
  // Only show tooltip if there's active data
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>Year: {label}</p>
        <p>${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};

// Component for displaying an earnings graph
function EarningsGraph({ preproccesedData }) {
  // State for storing the processed data
  const [postProcessedData, setpostProcessedData] = useState([]);

  // Process the data when it changes
  useEffect(() => {
    // Only process if there's data
    if (preproccesedData) {
      // Transform the data into a format suitable for the graph
      const transformedData = preproccesedData["annualEarnings"].map(
        (earningsData) => {
          // Extract the year from the fiscal date
          const year = earningsData.fiscalDateEnding.split("-")[0]; // Extract the year
          return {
            date: year,
            earnings: parseFloat(earningsData.reportedEPS),
          };
        }
      );
      // Sort the data by date
      transformedData.sort((a, b) => a.date - b.date);
      // Update the state with the transformed data
      setpostProcessedData(transformedData);
    }
  }, [preproccesedData]);

  // Render the graph
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        data={postProcessedData}
      >
        <Bar dataKey="earnings" fill="#2451B7" opacity={0.5} />
        <CartesianGrid opacity={0.5} vertical={false} />
        <XAxis dataKey="date" />
        <YAxis
          axisLine={false}
          tickCount={9}
          domain={["dataMin", "dataMax"]}
          tickFormatter={(earnings) => `$${earnings}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default EarningsGraph;
