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

const CustomTooltip = ({ active, payload, label }) => {
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

function EarningsGraph({ preproccesedData }) {
  const [postProcessedData, setpostProcessedData] = useState([]);

  useEffect(() => {
    if (preproccesedData) {
      const transformedData = preproccesedData["annualEarnings"].map(
        (earningsData) => {
          const year = earningsData.fiscalDateEnding.split("-")[0]; // Extract the year
          return {
            date: year,
            earnings: parseFloat(earningsData.reportedEPS),
          };
        }
      );
      transformedData.sort((a, b) => a.date - b.date);
      setpostProcessedData(transformedData);
    }
  }, [preproccesedData]);

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
