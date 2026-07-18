import { Outlet } from "react-router-dom";

import NavigationRail from "@/app/navigation/NavigationRail/NavigationRail";
import TopBar from "@/app/navigation/TopBar/TopBar";

import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="AppLayout">
      <NavigationRail />

      <main className="MainContent">
        <TopBar />

        <div className="PageContent">
          <Outlet />
        </div>
      </main>
    </div>
  );
}