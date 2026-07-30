import React from "react";
import ReactDOM from "react-dom/client";

import "@/app/styles/tokens.css";
import "@/app/styles/globals.css";
import "@/app/styles/typography.css";
import "@/app/styles/utilities.css";

import { Provider } from "react-redux";
import store from "@/app/store";
import App from "@/app/App";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <App />
  </Provider>
);