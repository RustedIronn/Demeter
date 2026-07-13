import { useSelector } from "react-redux";
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
    <div className="Streak">

      <h4>🔥 Streak</h4>

      <div className="StreakRow">
        <span>Current Streak</span>

        <strong>
          {streak.currentStreak} days
        </strong>
      </div>


      <div className="StreakRow">
        <span>Longest Streak</span>

        <strong>
          {streak.longestStreak} days
        </strong>
      </div>

    </div>
  );
}