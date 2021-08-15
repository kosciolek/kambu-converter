import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Config } from "./configs/Config";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Config>
      <App />
    </Config>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
