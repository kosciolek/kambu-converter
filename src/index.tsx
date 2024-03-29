import React from "react";
import ReactDOM from "react-dom";
import { Config } from "./configs/Config";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const persist = process.env.NODE_ENV !== "development";

ReactDOM.render(
  <React.StrictMode>
    <Config persist={persist}>
      <App />
    </Config>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  const { worker } = require("./mock-service-worker");
  worker.start();
}
