import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import {
  updatePersonalData,
} from "@/store/personal/thunks";
import "./NutritionGoals.css";

export default function NutritionGoals() {
  const personal = useSelector(
    (state) => state.personal
  );

  const dispatch = useDispatch();

const [isEditing, setIsEditing] = useState(false);

const [calories, setCalories] = useState(
  personal.daily_goal
);

const [protein, setProtein] = useState(
  personal.protein_goal
);

const [carbs, setCarbs] = useState(
  personal.carbs_goal
);

const [fat, setFat] = useState(
  personal.fat_goal
);

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

  return (
    <div className="NutritionGoals">
      <h4>🍗 Nutrition Goals</h4>

      <div className="NutritionGoalsRow">
  <span>Calories</span>

  {isEditing ? (
    <Form.Control
      type="number"
      value={calories}
      onChange={(e) =>
        setCalories(Number(e.target.value))
      }
      style={{ width: "100px" }}
    />
  ) : (
    <strong>{personal.daily_goal} cal</strong>
  )}
</div>

      <div className="NutritionGoalsRow">
  <span>Protein</span>

  {isEditing ? (
    <Form.Control
      type="number"
      value={protein}
      onChange={(e) =>
        setProtein(Number(e.target.value))
      }
      style={{ width: "100px" }}
    />
  ) : (
    <strong>{personal.protein_goal} g</strong>
  )}
</div>

     <div className="NutritionGoalsRow">
  <span>Carbs</span>

  {isEditing ? (
    <Form.Control
      type="number"
      value={carbs}
      onChange={(e) =>
        setCarbs(Number(e.target.value))
      }
      style={{ width: "100px" }}
    />
  ) : (
    <strong>{personal.carbs_goal} g</strong>
  )}
</div>
<div className="NutritionGoalsRow">
  <span>Fat</span>

  {isEditing ? (
    <Form.Control
      type="number"
      value={fat}
      onChange={(e) =>
        setFat(Number(e.target.value))
      }
      style={{ width: "100px" }}
    />
  ) : (
    <strong>{personal.fat_goal} g</strong>
  )}
</div>
<div className="mt-3 text-center">
  {isEditing ? (
    <>
      <Button
        variant="success"
        className="me-2"
        onClick={() => {
          dispatch(
            updatePersonalData({
              daily_goal: calories,
              protein_goal: protein,
              carbs_goal: carbs,
              fat_goal: fat,
            })
          );
          setIsEditing(false);
        }}
      >
        Save
      </Button>

      <Button
        variant="secondary"
        onClick={() => {
          setCalories(personal.daily_goal);
          setProtein(personal.protein_goal);
          setCarbs(personal.carbs_goal);
          setFat(personal.fat_goal);

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
      Edit Goals
    </Button>
  )}
</div>
    </div>
  );
}