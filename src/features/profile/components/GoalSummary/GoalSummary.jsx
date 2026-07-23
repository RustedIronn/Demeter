import { useSelector } from "react-redux";
import Card from "@/shared/ui/Card/Card";
import {
  Flame,
  Wheat,
  Beef,
  Droplet,
} from "lucide-react";

import "./GoalSummary.css";

export default function GoalSummary() {

  const personal = useSelector(
    (state) => state.personal
  );

  const {
    caloriesConsumed,
    proteinConsumed,
    carbsConsumed,
    fatConsumed,
  } = useSelector(
    (state) => state.calculatedInformation
  );

  const percentage =
    personal.daily_goal
      ? Math.min(
          Math.round(
            (caloriesConsumed /
              personal.daily_goal) *
              100
          ),
          100
        )
      : 0;

  return (
    <Card className="GoalSummary">

      <h2>
        Today's Goals
      </h2>

      <div className="GoalProgress">

        <Flame />

        <div className="GoalProgressContent">

          <strong>
            {caloriesConsumed} / {personal.daily_goal} kcal
          </strong>

          <span>
            {percentage}% of daily goal
          </span>

          <div className="ProgressTrack">

            <div
              className="ProgressFill"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

      </div>

      <div className="MacroGrid">

        <MacroCard
          icon={<Beef />}
          label="Protein"
          value={proteinConsumed}
          goal={personal.protein_goal}
        />

        <MacroCard
          icon={<Wheat />}
          label="Carbs"
          value={carbsConsumed}
          goal={personal.carbs_goal}
        />

        <MacroCard
          icon={<Droplet />}
          label="Fat"
          value={fatConsumed}
          goal={personal.fat_goal}
        />

      </div>

    </Card>
  );
}

function MacroCard({
  icon,
  label,
  value,
  goal,
}) {
  return (
    <div className="MacroCard">

      {icon}

      <span>
        {label}
      </span>

      <strong>
        {value}g
      </strong>

      <small>
        Goal: {goal} g
      </small>

    </div>
  );
}