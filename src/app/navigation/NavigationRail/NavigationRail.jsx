import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  UtensilsCrossed,
  ChartColumn,
  Target,
  User,
  Menu,
} from "lucide-react";

import "./NavigationRail.css";

export default function NavigationRail() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`NavigationRail ${
        collapsed ? "collapsed" : ""
      }`}
    >

      <button
        className="NavigationToggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu size={22}/>
      </button>

      <div className="Brand">

        <img src="/logo192.png" alt="Demeter" />

        {!collapsed && (
          <div>
            <h2>Demeter</h2>
            <small>Nutrition Tracker</small>
          </div>
        )}

      </div>


      <NavLink to="/today">
        <Home size={20}/>
        {!collapsed && <span>Today</span>}
      </NavLink>

      <NavLink to="/diary">
        <UtensilsCrossed size={20}/>
        {!collapsed && <span>Diary</span>}
      </NavLink>

      <NavLink to="/insights">
        <ChartColumn size={20}/>
        {!collapsed && <span>Insights</span>}
      </NavLink>

      <NavLink to="/goals">
        <Target size={20}/>
        {!collapsed && <span>Goals</span>}
      </NavLink>

      <NavLink to="/profile">
        <User size={20}/>
        {!collapsed && <span>Profile</span>}
      </NavLink>

    </aside>
  );
}