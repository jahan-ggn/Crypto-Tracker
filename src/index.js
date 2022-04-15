import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CryptoContext from "./CryptoContext";
import CryptoState from "./CryptoState";

ReactDOM.render(
  <React.StrictMode>
    <CryptoState>
      <App />
    </CryptoState>
  </React.StrictMode>,
  document.getElementById("root")
);
