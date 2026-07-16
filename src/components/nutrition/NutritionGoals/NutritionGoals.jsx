import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Save, X } from "lucide-react";

import { updatePersonalData } from "@/store/personal/thunks";

import "./NutritionGoals.css";

export default function NutritionGoals() {
  const dispatch = useDispatch();

  const personal = useSelector(
    (state) => state.personal
  );

  const [isEditing, setIsEditing] = useState(false);

  const [calories, setCalories] = useState(personal.daily_goal);
  const [protein, setProtein] = useState(personal.protein_goal);
  const [carbs, setCarbs] = useState(personal.carbs_goal);
  const [fat, setFat] = useState(personal.fat_goal);

  useEffect(() => {
    setCalories(personal.daily_goal);
    setProtein(personal.protein_goal);
    setCarbs(personal.carbs_goal);
    setFat(personal.fat_goal);
  }, [
    personal.daily_goal,
    personal.protein_goal,
    personal.carbs_goal,
    personal.fat_goal,
  ]);

  const saveGoals = () => {
    dispatch(
      updatePersonalData({
        daily_goal: calories,
        protein_goal: protein,
        carbs_goal: carbs,
        fat_goal: fat,
      })
    );

    setIsEditing(false);
  };

  const cancelEdit = () => {
    setCalories(personal.daily_goal);
    setProtein(personal.protein_goal);
    setCarbs(personal.carbs_goal);
    setFat(personal.fat_goal);

    setIsEditing(false);
  };

  return (
    <section className="NutritionGoals">

      <div className="NutritionGoalsHeader">
        <h2>Nutrition Goals</h2>

        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            <Pencil size={16} />
            Edit
          </button>
        )}
      </div>

      <div className="NutritionGoalsGrid">

        <GoalInput
          label="Calories"
          unit="kcal"
          value={calories}
          editing={isEditing}
          onChange={setCalories}
        />

        <GoalInput
          label="Protein"
          unit="g"
          value={protein}
          editing={isEditing}
          onChange={setProtein}
        />

        <GoalInput
          label="Carbs"
          unit="g"
          value={carbs}
          editing={isEditing}
          onChange={setCarbs}
        />

        <GoalInput
          label="Fat"
          unit="g"
          value={fat}
          editing={isEditing}
          onChange={setFat}
        />

      </div>

      {isEditing && (
        <div className="NutritionGoalActions">

          <button
            className="Cancel"
            onClick={cancelEdit}
          >
            <X size={16} />
            Cancel
          </button>

          <button
            className="Save"
            onClick={saveGoals}
          >
            <Save size={16} />
            Save
          </button>

        </div>
      )}

    </section>
  );
}

function GoalInput({
  label,
  unit,
  value,
  editing,
  onChange,
}) {
  return (
    <div className="GoalInput">

      <span>{label}</span>

      {editing ? (
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
        />
      ) : (
        <strong>
          {value} {unit}
        </strong>
      )}

    </div>
  );
}