import { useSelector } from "react-redux";
import { Flame } from "lucide-react";

import { getStreakData } from "@/assets/utils/nutritionAnalytics";

import "./Streak.css";

export default function Streak() {
  const personal = useSelector(
    (state) => state.personal
  );

  const streak = getStreakData(
    personal.data_points,
    {
      calories: personal.daily_goal,
      protein: personal.protein_goal,
    }
  );

  return (
    <section className="Streak">

      <div className="StreakHeader">

        <div className="StreakIcon">
          <Flame />
        </div>

        <div>
          <h2>Streak</h2>
          <p>Keep your momentum going</p>
        </div>

      </div>

      <div className="StreakGrid">

        <div className="StreakItem">
          <span>Current</span>

          <strong>
            {streak.currentStreak} days
          </strong>
        </div>

        <div className="StreakItem">
          <span>Longest</span>

          <strong>
            {streak.longestStreak} days
          </strong>
        </div>

      </div>

    </section>
  );
}