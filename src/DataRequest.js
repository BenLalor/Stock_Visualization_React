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
  const [data, setData] = useState({
    monthly: null,
    dividend: null,
    earnings: null,
  });
  const [selectedGraph, setSelectedGraph] = useState("monthly");
  const radios = [
    { name: "Monthly", value: "monthly" },
    { name: "Dividend", value: "dividend" },
    { name: "Earnings", value: "earnings" },
  ];

  useEffect(
    () => {
      if (!data[selectedGraph]) {
        if (selectedGraph === "monthly") {
          let url = new URL("https://www.alphavantage.co/query");
          let params = {
            function: "TIME_SERIES_MONTHLY_ADJUSTED",
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
              setData((prevData) => ({
                ...prevData,
                [selectedGraph]: fetchedData,
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
    },
    [selectedGraph],
    symbol
  );

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
