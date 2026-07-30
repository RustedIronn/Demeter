import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Beef,
  Flame,
  Pencil,
  Save,
  Wheat,
  X,
  Zap,
} from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";

import { updateProfileData } from "@/features/profile/store/thunks";

import "./NutritionGoals.css";

const GOALS = [
  {
    key: "daily_goal",
    label: "Calories",
    unit: "kcal",
    icon: Flame,
    accent: "var(--color-primary)",
  },
  {
    key: "protein_goal",
    label: "Protein",
    unit: "g",
    icon: Beef,
    accent: "var(--color-success)",
  },
  {
    key: "carbs_goal",
    label: "Carbs",
    unit: "g",
    icon: Wheat,
    accent: "var(--color-warning)",
  },
  {
    key: "fat_goal",
    label: "Fat",
    unit: "g",
    icon: Zap,
    accent: "var(--color-maple)",
  },
];

function getGoalValues(profile) {
  return {
    daily_goal: Number(profile.daily_goal) || 0,
    protein_goal: Number(profile.protein_goal) || 0,
    carbs_goal: Number(profile.carbs_goal) || 0,
    fat_goal: Number(profile.fat_goal) || 0,
  };
}

export default function NutritionGoals() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const [isEditing, setIsEditing] = useState(false);
  const [goals, setGoals] = useState(() => getGoalValues(profile));

  useEffect(() => {
    if (!isEditing) {
      setGoals(getGoalValues(profile));
    }
  }, [
    profile.daily_goal,
    profile.protein_goal,
    profile.carbs_goal,
    profile.fat_goal,
    isEditing,
  ]);

  const updateGoal = (key, value) => {
    const parsedValue = Number(value);

    setGoals((current) => ({
      ...current,
      [key]: Number.isFinite(parsedValue)
        ? Math.max(0, parsedValue)
        : 0,
    }));
  };

  const saveGoals = () => {
    dispatch(updateProfileData(goals));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setGoals(getGoalValues(profile));
    setIsEditing(false);
  };

  return (
    <Card className="NutritionGoals">
      <CardHeader
        title="Nutrition Goals"
        subtitle="Your daily calorie and macro targets"
        action={
          !isEditing ? (
            <Button
              variant="secondary"
              size="small"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={16} />
              Edit
            </Button>
          ) : null
        }
      />

      <div className="NutritionGoalsGrid">
        {GOALS.map((goal) => (
          <GoalInput
            key={goal.key}
            {...goal}
            value={goals[goal.key]}
            editing={isEditing}
            onChange={(value) => updateGoal(goal.key, value)}
          />
        ))}
      </div>

      {isEditing && (
        <div className="NutritionGoalActions">
          <Button
            variant="secondary"
            onClick={cancelEdit}
          >
            <X size={16} />
            Cancel
          </Button>

          <Button onClick={saveGoals}>
            <Save size={16} />
            Save Goals
          </Button>
        </div>
      )}
    </Card>
  );
}

function GoalInput({
  label,
  unit,
  icon: Icon,
  accent,
  value,
  editing,
  onChange,
}) {
  return (
    <div
      className="GoalInput"
      style={{ "--goal-accent": accent }}
    >
      <div className="GoalLabel">
        <div className="GoalIcon">
          <Icon size={18} />
        </div>

        <span>{label}</span>
      </div>

      {editing ? (
        <div className="GoalEditField">
          <Input
            type="number"
            min="0"
            step="1"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label={`${label} goal`}
          />

          <span>{unit}</span>
        </div>
      ) : (
        <div className="GoalValue">
          <strong>{value}</strong>
          <span>{unit}</span>
        </div>
      )}
    </div>
  );
}