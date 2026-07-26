import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import Today from "@/features/dashboard/pages/Today/Today";
import Diary from "@/features/nutrition/pages/Diary/Diary";

import Goals from "@/features/goals/pages/Goals/Goals";
import Insights from "@/features/insights/pages/Insights/Insights";
import Profile from "@/features/profile/pages/Profile/Profile";


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
      <Navigate to="/today" replace />
    }
  />

  <Route
    path="*"
    element={
      <Navigate to="/today" replace />
    }
  />

</Route>

      </Routes>

    </BrowserRouter>
  );
}