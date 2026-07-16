import Exercise from "@/components/tracking/Exercise/Exercise";
import WaterCard from "@/components/tracking/WaterCard/WaterCard";
import GoalWeight from "@/components/tracking/GoalWeight/GoalWeight";
import NutritionGoals from "@/components/nutrition/NutritionGoals/NutritionGoals";
import Streak from "@/components/tracking/Streak/Streak";

import "./Goals.css";

export default function Goals() {
  return (
    <div className="Goals">

      <section className="PageHeader">
        <h1>Goals</h1>

        <p>
          Manage your daily targets and long-term progress.
        </p>
      </section>

      <div className="GoalsGrid">

        <NutritionGoals />

        <WaterCard />

        <GoalWeight />

        <Exercise />

        <Streak />

      </div>

    </div>
  );
}