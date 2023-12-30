import React, { useState, useEffect } from "react";
import DataRequest from "./DataRequest";

function SymbolSearch() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  useEffect(() => {
    if (input.length > 0) {
      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=YOUR_API_KEY`
      )
        .then((response) => response.json())
        .then((data) => {
          setResults(data.bestMatches);
        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
        });
    } else {
      setResults([]);
    }
  }, [input]);

  return (
    <>
      <div className="row">
        <div className="search-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="🔍 Stock Ticker..."
            name="searchBar"
            className="searchBar"
          />
          <div className="searchResults">
            {results.map((result, index) => (
              <p
                key={index}
                onClick={() => {
                  setSelectedSymbol(result["1. symbol"]);
                  setInput(result["1. symbol"]); // Set input to the clicked symbol
                }}
              >
                {result["1. symbol"]} ({result["2. name"]})
              </p>
            ))}
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/Stocker.png`}
          alt="Stocker Logo2"
          className="responsive-logo "
        />
      </div>
      {selectedSymbol && (
        <div className="dataRequestContainer">
          <DataRequest symbol={selectedSymbol} />
        </div>
      )}
    </>
  );
}

export default SymbolSearch;
