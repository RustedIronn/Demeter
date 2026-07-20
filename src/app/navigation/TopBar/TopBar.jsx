import { useLocation } from "react-router-dom";
import "./TopBar.css";

export default function TopBar() {
  const { pathname } = useLocation();

  const titles = {
    "/today": "Today",
    "/diary": "Diary",
    "/insights": "Insights",
    "/goals": "Goals",
    "/profile": "Profile",
  };

  return (
    <header className="TopBar">
      <h2>
        {titles[pathname] || "Demeter"}
      </h2>
    </header>
  );
}