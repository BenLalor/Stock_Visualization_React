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

const CustomTooltip = ({ active, payload, label }) => {
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

function DividendGraph({ preproccesedData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (preproccesedData) {
      console.log("preproccessed data: " + preproccesedData);
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
        .reverse(); // Add this line

      setData(transformedData);
    }
  }, [preproccesedData]);

  function removeNonDividendMonths(data) {
    return data.filter((dataPoint) => dataPoint.value > 0);
  }

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
