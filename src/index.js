import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DataRequest from "./DataRequest";
import SymbolSearch from "./SymbolSearch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <div className="row">
      <SymbolSearch className="search" />
      <img
        src={`${process.env.PUBLIC_URL}/Stocker.png`}
        alt="Stocker Logo2"
        className="responsive-logo "
      />
    </div>
    <DataRequest />
  </>
);
