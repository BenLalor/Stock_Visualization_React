import React, { useState, useEffect } from "react";
import "./index.css";
import MonthlyGraph from "./MonthlyGraph";
import DividendGraph from "./DividendGraph";
import EarningsGraph from "./EarningsGraph";
import testData_intraday from "./testData/intraday.json";
import testData_earnings from "./testData/earnings.json";
import testData_dividend from "./testData/dividend.json";

function App() {
  const [data, setData] = useState({
    intraday: null,
    dividend: null,
    earnings: null,
  });
  const [selectedGraph, setSelectedGraph] = useState("intraday");

  useEffect(() => {
    if (!data[selectedGraph]) {
      if (selectedGraph === "intraday") {
        let url = new URL("https://www.alphavantage.co/query");
        let params = {
          function: "TIME_SERIES_INTRADAY",
          interval: "1min",
          symbol: "AAPL",
          apikey: "PX3W9VGLFJ6Z4MHR",
        };

        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );

        fetch(url, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((fetchedData) => {
            setData((prevData) => ({
              ...prevData,
              [selectedGraph]: testData_intraday,
            }));
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (selectedGraph === "dividend") {
        setData((prevData) => ({
          ...prevData,
          [selectedGraph]: testData_dividend,
        }));
      } else if (selectedGraph === "earnings") {
        setData((prevData) => ({
          ...prevData,
          [selectedGraph]: testData_earnings,
        }));
      }
    }
  }, [selectedGraph]);

  return (
    <div className="App">
      <button onClick={() => setSelectedGraph("intraday")}>Intraday</button>
      <button onClick={() => setSelectedGraph("dividend")}>Dividend</button>
      <button onClick={() => setSelectedGraph("earnings")}>Earnings</button>

      {selectedGraph === "intraday" && (
        <MonthlyGraph preproccesedData={data.intraday} />
      )}
      {selectedGraph === "dividend" && (
        <DividendGraph preproccesedData={data.dividend} />
      )}
      {selectedGraph === "earnings" && (
        <EarningsGraph preproccesedData={data.earnings} />
      )}
    </div>
  );
}

export default App;
