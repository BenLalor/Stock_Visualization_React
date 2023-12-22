import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DataRequest from "./DataRequest";
import reportWebVitals from "./reportWebVitals";
import SymbolSearch from "./SymbolSearch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="row">
      <SymbolSearch className="search" />
      <img
        src={`${process.env.PUBLIC_URL}/stocker.png`}
        alt="Stocker Logo2"
        className="responsive-logo "
      />
    </div>
    <DataRequest />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
