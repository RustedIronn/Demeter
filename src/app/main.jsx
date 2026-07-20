import React from "react";
import ReactDOM from "react-dom/client";


import "@/styles/variables.css";
import "@/styles/globals.css";
import "@/styles/typography.css";
import "@/styles/utilities.css";

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