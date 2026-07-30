import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChartColumn,
  Home,
  Menu,
  Target,
  User,
  UtensilsCrossed,
} from "lucide-react";

import "./NavigationRail.css";

const NAVIGATION_ITEMS = [
  {
    to: "/today",
    label: "Today",
    icon: Home,
  },
  {
    to: "/diary",
    label: "Diary",
    icon: UtensilsCrossed,
  },
  {
    to: "/insights",
    label: "Insights",
    icon: ChartColumn,
  },
  {
    to: "/goals",
    label: "Goals",
    icon: Target,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
];

export default function NavigationRail() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`NavigationRail ${collapsed ? "collapsed" : ""}`}
      aria-label="Main navigation"
    >
      <button
        type="button"
        className="NavigationToggle"
        onClick={() => setCollapsed((current) => !current)}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        aria-expanded={!collapsed}
      >
        <Menu size={21} />
      </button>

      <div className="NavigationBrand">
        <img src="https://i.ibb.co/FkY63bLK/Demeter-Fresh-Sleek.png" alt="" />

        <div className="NavigationBrandText">
          <h2>Demeter</h2>
          <span>Nutrition Tracker</span>
        </div>
      </div>

      <nav className="NavigationLinks">
        {NAVIGATION_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? "NavigationLink active"
                : "NavigationLink"
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={20} />

            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}