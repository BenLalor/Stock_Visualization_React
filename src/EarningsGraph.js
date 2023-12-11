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

function EarningsGraph({ preproccesedData }) {
  const [postProcessedData, setpostProcessedData] = useState([]);

  useEffect(() => {
    if (preproccesedData) {
      const transformedData = Object.entries(
        preproccesedData["annualEarnings"]
      ).map(([date, earnings]) => {
        const parsedDate = new Date(date);
        const formattedDate =
          (parsedDate.getMonth() + 1).toString().padStart(2, "0") +
          "/" +
          parsedDate.getDate().toString().padStart(2, "0") +
          "/" +
          parsedDate.getFullYear().toString().substr(-2);
        return {
          date: formattedDate,
          close: parseFloat(earnings["reportedEPS"]),
        };
      });
      setpostProcessedData(transformedData);
    }
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        data={postProcessedData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="close" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default EarningsGraph;
