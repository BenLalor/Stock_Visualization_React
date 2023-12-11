import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyGraph({ preproccesedData }) {
  const [postProcessedData, setpostProcessedData] = useState([]);
  useEffect(() => {
    if (preproccesedData) {
      const transformedData = Object.entries(
        preproccesedData["Time Series (5min)"]
      ).map(([date, values]) => {
        const parsedDate = new Date(date);
        const formattedTime =
          parsedDate.getHours() + ":" + parsedDate.getMinutes();
        return {
          date: formattedTime,
          close: parseFloat(values["4. close"]),
        };
      });
      setpostProcessedData(transformedData);
    }
  }, [preproccesedData]);

  return (
    <div className="App">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={postProcessedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis
            domain={["dataMin", "dataMax"]}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyGraph;
