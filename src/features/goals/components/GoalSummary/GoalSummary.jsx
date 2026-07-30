import { useSelector } from "react-redux";
import { Beef, Droplet, Flame, Wheat } from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";

import "./GoalSummary.css";

const MACROS = [
  {
    key: "protein",
    label: "Protein",
    icon: Beef,
    color: "var(--color-success)",
  },
  {
    key: "carbs",
    label: "Carbs",
    icon: Wheat,
    color: "var(--color-warning)",
  },
  {
    key: "fat",
    label: "Fat",
    icon: Droplet,
    color: "var(--color-primary)",
  },
];

function getPercentage(value, goal) {
  if (!goal) return 0;

  return Math.min(
    Math.max(Math.round((value / goal) * 100), 0),
    100
  );
}

export default function GoalSummary() {
  const profile = useSelector((state) => state.profile);

  const {
    caloriesConsumed = 0,
    proteinConsumed = 0,
    carbsConsumed = 0,
    fatConsumed = 0,
  } = useSelector((state) => state.goals);

  const calorieGoal = Number(profile.daily_goal) || 0;

  const caloriePercentage = getPercentage(
    caloriesConsumed,
    calorieGoal
  );

  const macroValues = {
    protein: {
      value: proteinConsumed,
      goal: Number(profile.protein_goal) || 0,
    },
    carbs: {
      value: carbsConsumed,
      goal: Number(profile.carbs_goal) || 0,
    },
    fat: {
      value: fatConsumed,
      goal: Number(profile.fat_goal) || 0,
    },
  };

  return (
    <Card className="GoalSummary">
      <CardHeader
        title="Today’s Goals"
        subtitle="Your daily nutrition progress"
      />

      <div className="GoalProgress">
        <div className="GoalProgressIcon">
          <Flame size={22} />
        </div>

        <div className="GoalProgressContent">
          <div className="GoalProgressValues">
            <strong>
              {Math.round(caloriesConsumed)} kcal
            </strong>

            <span>
              of {calorieGoal || "--"} kcal
            </span>
          </div>

          <div
            className="GoalProgressTrack"
            role="progressbar"
            aria-label="Daily calorie progress"
            aria-valuemin="0"
            aria-valuemax={calorieGoal}
            aria-valuenow={Math.round(caloriesConsumed)}
          >
            <div
              className="GoalProgressFill"
              style={{ width: `${caloriePercentage}%` }}
            />
          </div>

          <span className="GoalProgressPercentage">
            {caloriePercentage}% of daily goal
          </span>
        </div>
      </div>

      <div className="MacroGrid">
        {MACROS.map(({ key, label, icon: Icon, color }) => {
          const { value, goal } = macroValues[key];

          return (
            <MacroCard
              key={key}
              icon={Icon}
              label={label}
              value={value}
              goal={goal}
              color={color}
            />
          );
        })}
      </div>
    </Card>
  );
}

function MacroCard({
  icon: Icon,
  label,
  value,
  goal,
  color,
}) {
  const percentage = getPercentage(value, goal);

  return (
    <div
      className="GoalMacroCard"
      style={{ "--macro-color": color }}
    >
      <div className="GoalMacroHeader">
        <div className="GoalMacroIcon">
          <Icon size={18} />
        </div>

        <span>{label}</span>
      </div>

      <div className="GoalMacroValue">
        <strong>{Math.round(value)}</strong>
        <span>/ {goal || "--"} g</span>
      </div>

      <div className="GoalMacroTrack">
        <div
          className="GoalMacroFill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}