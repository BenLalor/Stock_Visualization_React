import React, { useState, useEffect } from "react";
import "./index.css";
import MonthlyGraph from "./MonthlyGraph";
import DividendGraph from "./DividendGraph";
import EarningsGraph from "./EarningsGraph";
import testData_monthly from "./testData/monthly.json";
import testData_earnings from "./testData/earnings.json";
import testData_dividend from "./testData/dividend.json";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

function DataRequest({ symbol }) {
  // State variables
  const [data, setData] = useState({
    monthly: null,
    dividend: null,
    earnings: null,
  });
  const [selectedGraph, setSelectedGraph] = useState("monthly");

  // Effect hook to fetch data when selectedGraph or symbol changes
  useEffect(() => {
    // Only fetch data if it hasn't been fetched yet
    if (!data[selectedGraph]) {
      let url = new URL("https://www.alphavantage.co/query");
      let params = {
        function:
          selectedGraph === "monthly" || selectedGraph === "dividend"
            ? "TIME_SERIES_MONTHLY_ADJUSTED"
            : selectedGraph === "earnings"
            ? "EARNINGS"
            : selectedGraph.toUpperCase(),
        symbol: symbol,
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
          if (fetchedData.Information) {
            // API limit reached, use test data
            console.error(fetchedData.Information);
            setData((prevData) => ({
              ...prevData,
              monthly: testData_monthly,
              dividend: testData_dividend,
              earnings: testData_earnings,
            }));
          } else {
            // API limit not reached, use fetched data
            setData((prevData) => ({
              ...prevData,
              [selectedGraph]: fetchedData,
            }));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedGraph, symbol]);

  return (
    <div className="App">
      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        <ToggleButton
          id="tbg-radio-1"
          value={1}
          onChange={() => {
            setSelectedGraph("monthly");
          }}
        >
          Monthly
        </ToggleButton>
        <ToggleButton
          id="tbg-radio-2"
          value={2}
          onChange={() => {
            setSelectedGraph("dividend");
          }}
        >
          Dividend
        </ToggleButton>
        <ToggleButton
          id="tbg-radio-3"
          value={3}
          onChange={() => {
            setSelectedGraph("earnings");
          }}
        >
          Earnings
        </ToggleButton>
      </ToggleButtonGroup>

      {selectedGraph === "monthly" && (
        <MonthlyGraph preproccesedData={data.monthly} />
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

export default DataRequest;
