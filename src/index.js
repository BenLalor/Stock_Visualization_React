import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DataRequest from "./DataRequest";
import SymbolSearch from "./SymbolSearch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <SymbolSearch className="search" />
  </>
);
