import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import {
  getNutritionAverage,
  getGoalAchievement,
} from "@/assets/utils/nutritionAnalytics";

import "./Analytics.css";

export default function Analytics() {

const [period, setPeriod] = useState("week");

const personal = useSelector(
  (state) => state.personal
);

const analytics = useMemo(() => {
  const now = new Date();

  const filtered = personal.data_points.filter((day) => {
    const date = new Date(day.date);

    if (period === "week") {
      return (
        (now - date) / (1000 * 60 * 60 * 24) <= 7
      );
    }

    if (period === "month") {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    }

    return (
      date.getFullYear() ===
      now.getFullYear()
    );
  });

const averages =
  getNutritionAverage(filtered);

const achievements =
  getGoalAchievement(
    filtered,
    {
      calories: personal.daily_goal,
      protein: personal.protein_goal,
      carbs: personal.carbs_goal,
      fat: personal.fat_goal,
    }
  );

return {
  averageCalories: averages.calories,
  averageProtein: averages.protein,
  averageCarbs: averages.carbs,
  averageFat: averages.fat,
  loggedDays: averages.loggedDays,

  achievements,
};
}, [
  period,
  personal.data_points,
  personal.daily_goal,
  personal.protein_goal,
  personal.carbs_goal,
  personal.fat_goal,
]);

  return (
    <div className="Analytics">
  <h4>📅 Analytics</h4>

  <Form.Select
    className="mb-3"
    value={period}
    onChange={(e) =>
      setPeriod(e.target.value)
    }
  >
    <option value="week">Week</option>
    <option value="month">Month</option>
    <option value="year">Year</option>
  </Form.Select>

  <div className="AnalyticsRow">
    <span>Average Calories</span>
    <strong>
      {analytics.averageCalories}
    </strong>
  </div>

  <div className="AnalyticsRow">
    <span>Average Protein</span>
    <strong>
      {analytics.averageProtein} g
    </strong>
  </div>

  <div className="AnalyticsRow">
    <span>Average Carbs</span>
    <strong>
      {analytics.averageCarbs} g
    </strong>
  </div>

  <div className="AnalyticsRow">
    <span>Average Fat</span>
    <strong>
      {analytics.averageFat} g
    </strong>
  </div>

  <div className="AnalyticsRow">
    <span>Logged Days</span>
    <strong>
      {analytics.loggedDays}
    </strong>
  </div>
  <div className="AnalyticsRow">
  <span>Calories Goal</span>
  <strong>
    {analytics.achievements.caloriesHit}
    /
    {analytics.achievements.totalDays}
  </strong>
</div>

<div className="AnalyticsRow">
  <span>Protein Goal</span>
  <strong>
    {analytics.achievements.proteinHit}
    /
    {analytics.achievements.totalDays}
  </strong>
</div>

<div className="AnalyticsRow">
  <span>Carbs Goal</span>
  <strong>
    {analytics.achievements.carbsHit}
    /
    {analytics.achievements.totalDays}
  </strong>
</div>

<div className="AnalyticsRow">
  <span>Fat Goal</span>
  <strong>
    {analytics.achievements.fatHit}
    /
    {analytics.achievements.totalDays}
  </strong>
</div>
</div>
  );
}