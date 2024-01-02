import React, { useState, useEffect } from "react";
import DataRequest from "./DataRequest";

function SymbolSearch() {
  // State variables
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("IBM");
  const [showResults, setShowResults] = useState(false);
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  // Effect hook to fetch data when input changes
  useEffect(() => {
    if (input.length > 0) {
      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=YOUR_API_KEY`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.Information) {
            // API limit reached, hide results and disable input
            console.error(data.Information);
            setResults([]);
            setShowResults(false);
            setInput("IBM");
            setApiLimitReached(true);
            setFlashMessage(
              "API limit reached. You can only view IBM stock data now."
            );
          } else {
            // API limit not reached, show results
            setResults(data.bestMatches);
            setShowResults(true);
            setFlashMessage("");
          }
        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
        });
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [input]);

  // Render component
  return (
    <>
      {flashMessage && <div className="flash-message">{flashMessage}</div>}{" "}
      <div className="row">
        <div className="search-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="🔍 Search For Stock Ticker..... (IBM)"
            name="searchBar"
            className="searchBar"
            disabled={apiLimitReached}
          />
          {showResults && (
            <div className="searchResults">
              {results.map((result, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedSymbol(result["1. symbol"]);
                    setInput(result["1. symbol"]);
                    setShowResults(false);
                  }}
                >
                  {result["1. symbol"]} ({result["2. name"]})
                </p>
              ))}
            </div>
          )}
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/Stocker.png`}
          alt="Stocker Logo2"
          className="responsive-logo "
        />
      </div>
      <div className="dataRequestContainer">
        <DataRequest symbol={selectedSymbol} />
      </div>
    </>
  );
}

export default SymbolSearch;
