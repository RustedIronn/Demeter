import { Outlet } from "react-router-dom";

import NavigationRail from "@/components/navigation/NavigationRail/NavigationRail";
import TopBar from "@/components/navigation/TopBar/TopBar";

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