import Exercise from "@/features/goals/components/Exercise/Exercise";
import WaterCard from "@/features/goals/components/WaterCard/WaterCard";
import GoalWeight from "@/features/goals/components/GoalWeight/GoalWeight";
import NutritionGoals from "@/features/goals/components/NutritionGoals/NutritionGoals";
import Streak from "@/features/goals/components/Streak/Streak";

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

        <div className="NutritionCard">
          <NutritionGoals />
        </div>


        <div className="WaterCardWrapper">
          <WaterCard />
        </div>


        <div className="GoalWeightWrapper">
          <GoalWeight />
        </div>


        <div className="StreakWrapper">
          <Streak />
        </div>


        <div className="ExerciseWrapper">
          <Exercise />
        </div>

      </div>

    </div>
  );
}