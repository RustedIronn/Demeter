import { useEffect, useState } from "react";
import { Alert, ListGroup } from "react-bootstrap";

import "./Exercise.css";

export default function Exercise({ caloriesBurned }) {
  const [workoutSuggestions, setWorkoutSuggestions] = useState([]);

  useEffect(() => {
    let suggestions = [];

    if (caloriesBurned < 100) {
      suggestions = [
        "No additional exercise needed, you have burned a small amount of calories.",
      ];
    } else if (caloriesBurned < 500) {
      suggestions = [
        "You can go for a walk or do light stretching exercises.",
      ];
    } else if (caloriesBurned < 1500) {
      suggestions = [
        "Consider doing a moderate workout like cycling or brisk walking.",
      ];
    } else {
      suggestions = [
        "Go for a high-intensity workout like interval training or swimming to burn even more calories.",
      ];
    }

    setWorkoutSuggestions(suggestions);
  }, [caloriesBurned]);

  return (
    <div className="Exercise noselect">
      <h3>Exercise Tracker</h3>

      {caloriesBurned > 0 && (
        <Alert variant="info">
          You will burn <strong>{caloriesBurned} calories</strong> from the
          following exercise.
        </Alert>
      )}

      {workoutSuggestions.length > 0 && (
        <>
          <h4>Suggested Workouts:</h4>

          <ListGroup>
            {workoutSuggestions.map((suggestion, index) => (
              <ListGroup.Item key={index}>
                {suggestion}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
}