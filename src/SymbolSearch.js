import React, { useState, useEffect } from "react";

function SymbolSearch() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

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
          <p key={index}>
            {result["1. symbol"]} ({result["2. name"]})
          </p>
        ))}
      </div>
    </div>
  );
}

export default SymbolSearch;
