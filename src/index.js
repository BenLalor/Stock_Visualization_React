import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DataRequest from "./DataRequest";
import SymbolSearch from "./SymbolSearch";

// Create a root DOM node for React to render into
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the SymbolSearch component into the root DOM node
root.render(
  <>
    <SymbolSearch className="search" />
  </>
);
