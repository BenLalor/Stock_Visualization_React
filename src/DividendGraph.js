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

function DividendGraph({ preproccesedData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (preproccesedData) {
      const monthlyAdjustedTimeSeries =
        preproccesedData["Monthly Adjusted Time Series"];
      let transformedData = {};
      for (let year in monthlyAdjustedTimeSeries) {
        transformedData[year] =
          monthlyAdjustedTimeSeries[year]["7. dividend amount"];
      }
      transformedData = Object.entries(transformedData).map(
        ([date, value]) => ({
          date,
          value: parseFloat(value),
        })
      );

      setData(transformedData);
    }
  }, [preproccesedData]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid opacity={0.5} vertical={false} />
        <XAxis dataKey="date" />
        <YAxis axisLine={false} tickCount={9} />
        <Tooltip />
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
