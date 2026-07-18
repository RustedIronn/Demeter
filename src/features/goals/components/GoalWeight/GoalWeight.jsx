import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Save, X, Target } from "lucide-react";

import { setGoalWeight } from "@/features/profile/store/thunks";

import "./GoalWeight.css";

export default function GoalWeight() {
  const dispatch = useDispatch();

  const currentWeight = useSelector(
    (state) => state.personal.weight_kg
  );

  const goalWeight = useSelector(
    (state) => state.personal.goal_weight
  );

  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState(goalWeight);

  useEffect(() => {
    setGoal(goalWeight);
  }, [goalWeight]);

  const difference = Math.abs(currentWeight - goalWeight);

  let message = "Goal not set";

  if (goalWeight > 0) {
    if (currentWeight > goalWeight) {
      message = `${difference} kg to lose`;
    } else if (currentWeight < goalWeight) {
      message = `${difference} kg to gain`;
    } else {
      message = "Goal achieved 🎉";
    }
  }

  const saveGoal = () => {
    dispatch(setGoalWeight(goal));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setGoal(goalWeight);
    setIsEditing(false);
  };

  return (
    <section className="GoalWeight">

      <div className="GoalWeightHeader">

        <div className="GoalWeightIcon">
          <Target />
        </div>

        <div>
          <h2>Goal Weight</h2>
          <p>Track your weight target</p>
        </div>

      </div>

      <div className="GoalWeightGrid">

        <div className="GoalWeightItem">
          <span>Current</span>
          <strong>{currentWeight} kg</strong>
        </div>

        <div className="GoalWeightItem">
          <span>Goal</span>

          {isEditing ? (
            <input
              type="number"
              value={goal}
              onChange={(e) =>
                setGoal(Number(e.target.value))
              }
            />
          ) : (
            <strong>
              {goalWeight > 0
                ? `${goalWeight} kg`
                : "--"}
            </strong>
          )}
        </div>

      </div>

      <div className="GoalWeightStatus">
        {message}
      </div>

      <div className="GoalWeightActions">

        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>
            <Pencil size={16} />
            Edit Goal
          </button>
        ) : (
          <>
            <button
              className="Cancel"
              onClick={cancelEdit}
            >
              <X size={16} />
              Cancel
            </button>

            <button
              className="Save"
              onClick={saveGoal}
            >
              <Save size={16} />
              Save
            </button>
          </>
        )}

      </div>

    </section>
  );
}