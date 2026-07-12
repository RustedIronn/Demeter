import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import { setGoalWeight } from "../../store/personal/thunks";

import "./GoalWeight.css";

export default function GoalWeight() {
  const currentWeight = useSelector(
    (state) => state.personal.weight_kg
  );

  const goalWeight = useSelector(
    (state) => state.personal.goal_weight
  );

  const dispatch = useDispatch();

const [isEditing, setIsEditing] = useState(false);
const [goal, setGoal] = useState(goalWeight);

useEffect(() => {
  setGoal(goalWeight);
}, [goalWeight]);

  const difference = Math.abs(
    currentWeight - goalWeight
  );

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

  return (
    <div className="GoalWeight">
      <h4>🎯 Goal Weight</h4>

      <div className="GoalWeightRow">
        <span>Current</span>
        <strong>{currentWeight} kg</strong>
      </div>

     <div className="GoalWeightRow">
  <span>Goal</span>

  {isEditing ? (
    <Form.Control
      type="number"
      value={goal}
      onChange={(e) =>
        setGoal(Number(e.target.value))
      }
      style={{ width: "100px" }}
    />
  ) : (
    <strong>
      {goalWeight > 0
        ? `${goalWeight} kg`
        : "--"}
    </strong>
  )}
</div>

      <div className="GoalWeightStatus">
        {message}
      </div>
      <div className="mt-3 text-center">
  {isEditing ? (
    <>
      <Button
        variant="success"
        className="me-2"
        onClick={() => {
          dispatch(setGoalWeight(goal));
          setIsEditing(false);
        }}
      >
        Save
      </Button>

      <Button
        variant="secondary"
        onClick={() => {
          setGoal(goalWeight);
          setIsEditing(false);
        }}
      >
        Cancel
      </Button>
    </>
  ) : (
    <Button
      onClick={() => setIsEditing(true)}
    >
      Edit Goal
    </Button>
  )}
</div>
    </div>
  );
}