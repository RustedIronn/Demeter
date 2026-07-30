import { Outlet } from "react-router-dom";

import NavigationRail from "@/app/navigation/NavigationRail/NavigationRail";
import TopBar from "@/app/navigation/TopBar/TopBar";

import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="AppLayout">
      <NavigationRail />

      <div className="AppMain">
        <TopBar />

        <main className="PageContent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}