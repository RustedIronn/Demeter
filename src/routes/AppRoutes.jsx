import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import Today from "@/pages/Today/Today";
import Diary from "@/pages/Diary/Diary";

import Goals from "@/pages/Goals";
import Insights from "@/pages/Insights";
import Profile from "@/pages/Profile";


export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<AppLayout />}>

          <Route
            path="/today"
            element={<Today />}
          />

          <Route
            path="/diary"
            element={<Diary />}
          />

          <Route
            path="/goals"
            element={<Goals />}
          />

          <Route
            path="/insights"
            element={<Insights />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/"
            element={
              <Navigate to="/today" />
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}