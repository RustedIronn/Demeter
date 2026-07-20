import { NavLink } from "react-router-dom";

import {
  Home,
  UtensilsCrossed,
  ChartColumn,
  Target,
  User,
} from "lucide-react";

import "./NavigationRail.css";

export default function NavigationRail() {
  return (
    <aside className="NavigationRail">
      <div className="Brand">
  <img src="/logo192.png" alt="Demeter" />

  <div>
    <h2>Demeter</h2>
    <small>Nutrition Tracker</small>
  </div>
</div>

      <NavLink to="/today">
  <Home size={20} />
  <span>Today</span>
</NavLink>

<NavLink to="/diary">
  <UtensilsCrossed size={20} />
  <span>Diary</span>
</NavLink>

<NavLink to="/insights">
  <ChartColumn size={20} />
  <span>Insights</span>
</NavLink>

<NavLink to="/goals">
  <Target size={20} />
  <span>Goals</span>
</NavLink>

<NavLink to="/profile">
  <User size={20} />
  <span>Profile</span>
</NavLink>
    </aside>
  );
}