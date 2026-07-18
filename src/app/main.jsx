import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import Today from "@/features/dashboard/pages/Today/Today";
import Diary from "@/features/nutrition/pages/Diary/Diary";
import Insights from "@/features/insights/pages/Insights/Insights";
import Goals from "@/features/goals/pages/Goals/Goals";
import Profile from "@/features/profile/pages/Profile/Profile";

import "@/styles/variables.css";
import "@/styles/globals.css";
import "@/styles/typography.css";
import "@/styles/utilities.css";

import { Provider } from "react-redux";
import store from "@/app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Today />} />
          <Route path="diary" element={<Diary />} />
          <Route path="insights" element={<Insights />} />
          <Route path="goals" element={<Goals />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);