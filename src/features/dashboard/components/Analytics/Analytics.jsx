import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BarChart3 } from "lucide-react";
import Card from "@/shared/ui/Card/Card";

import {
  getNutritionAverage,
  getGoalAchievement,
} from "@/shared/utils/nutritionAnalytics";

import "./Analytics.css";

export default function Analytics() {

  const [period, setPeriod] = useState("week");

  const personal = useSelector(
    (state) => state.personal
  );

  const analytics = useMemo(() => {

    const now = new Date();

    const filtered =
      personal.data_points.filter((day) => {

        const date = new Date(day.date);

        if (period === "week") {
          return (
            (now - date) /
              (1000 * 60 * 60 * 24) <=
            7
          );
        }

        if (period === "month") {
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
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
      getGoalAchievement(filtered,{
        calories: personal.daily_goal,
        protein: personal.protein_goal,
        carbs: personal.carbs_goal,
        fat: personal.fat_goal,
      });

    return {

      ...averages,

      achievements,

    };

  },[
    period,
    personal,
  ]);

  return (

    <Card className="Analytics">

      <div className="AnalyticsHeader">

        <div className="AnalyticsIcon">
          <BarChart3/>
        </div>

        <div>

          <h2>
            Analytics
          </h2>

          <p>
            Nutrition overview
          </p>

        </div>

      </div>


      <div className="AnalyticsTabs">

        {["week","month","year"].map((item)=>(
          <button
            key={item}
            className={
              period===item
                ? "Active"
                : ""
            }
            onClick={()=>
              setPeriod(item)
            }
          >
            {item}
          </button>
        ))}

      </div>


      <div className="AnalyticsGrid">

        <Stat
          title="Calories"
          value={analytics.averageCalories}
          unit="kcal"
        />

        <Stat
          title="Protein"
          value={analytics.averageProtein}
          unit="g"
        />

        <Stat
          title="Carbs"
          value={analytics.averageCarbs}
          unit="g"
        />

        <Stat
          title="Fat"
          value={analytics.averageFat}
          unit="g"
        />

        <Stat
          title="Logged Days"
          value={analytics.loggedDays}
        />

      </div>


      <div className="GoalHits">

        <h3>
          Goal Achievement
        </h3>

        <GoalHit
          title="Calories"
          hit={
            analytics.achievements.caloriesHit
          }
          total={
            analytics.achievements.totalDays
          }
        />

        <GoalHit
          title="Protein"
          hit={
            analytics.achievements.proteinHit
          }
          total={
            analytics.achievements.totalDays
          }
        />

        <GoalHit
          title="Carbs"
          hit={
            analytics.achievements.carbsHit
          }
          total={
            analytics.achievements.totalDays
          }
        />

        <GoalHit
          title="Fat"
          hit={
            analytics.achievements.fatHit
          }
          total={
            analytics.achievements.totalDays
          }
        />

      </div>

    </Card>

  );

}

function Stat({
  title,
  value,
  unit,
}){

  return(

    <div className="Stat">

      <span>{title}</span>

      <strong>

        {value}

        {unit && ` ${unit}`}

      </strong>

    </div>

  );

}

function GoalHit({
  title,
  hit,
  total,
}){

  return(

    <div className="GoalHit">

      <span>{title}</span>

      <strong>

        {hit}/{total}

      </strong>

    </div>

  );

}