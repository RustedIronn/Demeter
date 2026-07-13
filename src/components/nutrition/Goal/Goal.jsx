import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import CardGold from "./CardGoal";
import GoalData from "./GoalData";
import Exercise from "@/components/tracking/Exercise/Exercise";
import WaterCard from "@/components/tracking/WaterCard/WaterCard";
import WeightHistory from "@/components/tracking/WeightHistory/WeightHistory";
import GoalWeight from "@/components/tracking/GoalWeight/GoalWeight";
import NutritionGoals from "@/components/nutrition/NutritionGoals/NutritionGoals";
import NutritionHistory from "@/components/nutrition/NutritionHistory/NutritionHistory";
import Analytics from "@/components/dashboard/Analytics/Analytics";
import Streak from "@/components/tracking/Streak/Streak";
import { capitalize } from "@/assets/utils/utils";

import "./Goal.css";

export default function Goal() {
  const isMobile = useSelector((state) => state.general.isMobile);
  const personal = useSelector((state) => state.personal);

  const {
    caloriesConsumed,
    proteinConsumed,
    carbsConsumed,
    fatConsumed,
    caloriesByMealType,
  } = useSelector((state) => state.calculatedInformation);

  let percentage = Math.round(
    (caloriesConsumed * 100) / personal.daily_goal
  );

  if (caloriesConsumed === 0 && personal.daily_goal === 0) {
    percentage = 0;
  }

  return (
    <div className="Goal noselect">
      <div className="d-flex justify-content-between">
        <CardGold
          isMobile={isMobile}
          calories={caloriesConsumed}
          subtitle="consumed"
          align="left"
        />

        <CardGold
          isMobile={isMobile}
          calories={personal.daily_goal}
          subtitle="daily goal"
          align="right"
        />
      </div>

      <div className="mb-3">
        <ProgressBar
          now={percentage}
          label={`${percentage}%`}
          visuallyHidden
        />

        <div
          className="GoalPercentage"
          style={{
            paddingLeft: `${Math.min(percentage, 100) - 5}%`,
          }}
        >
          {percentage}%
        </div>
      </div>

      <div className="d-flex justify-content-between">
        {Object.keys(caloriesByMealType).map((key, i) => (
          <GoalData
            key={i}
            isMobile={isMobile}
            text={capitalize(key)}
            number={caloriesByMealType[key]}
          />
        ))}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <GoalData
          isMobile={isMobile}
          text="Protein"
          number={`${proteinConsumed}g`}
        />

        <GoalData
          isMobile={isMobile}
          text="Carbs"
          number={`${carbsConsumed}g`}
        />

        <GoalData
          isMobile={isMobile}
          text="Fat"
          number={`${fatConsumed}g`}
        />
      </div>

      <div className="mt-4">
  <Exercise caloriesBurned={caloriesConsumed} />
</div>

<div className="mt-4">
  <WaterCard />
</div>
<div className="mt-4">
  <WeightHistory />
</div>
<div className="mt-4">
  <GoalWeight />
</div>
<div className="mt-4">
  <NutritionGoals />
</div>
<div className="mt-4">
  <NutritionHistory />
</div>
<div className="mt-4">
  <Analytics />
  </div>
  <div className="mt-4">
  <Streak />
  </div>
    </div>
  );
}