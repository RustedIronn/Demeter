import { useMemo } from "react";
import { Dumbbell } from "lucide-react";
import { useSelector } from "react-redux";
import Card from "@/shared/ui/Card/Card";
import "./Exercise.css";

export default function Exercise() {
  const caloriesConsumed = useSelector(
    (state) => state.calculatedInformation.caloriesConsumed
  );

  const recommendation = useMemo(() => {
    if (caloriesConsumed <= 500) {
      return {
        title: "Light Activity",
        text: "A relaxed walk or some stretching is enough for today.",
      };
    }

    if (caloriesConsumed <= 1500) {
      return {
        title: "Moderate Activity",
        text: "A 30–45 minute walk, cycling, or light gym session would complement today's intake.",
      };
    }

    return {
      title: "High Activity",
      text: "A longer workout or strength session would be a good match for today's nutrition.",
    };
  }, [caloriesConsumed]);

  return (
    <Card className="Exercise">

      <div className="ExerciseHeader">

        <div className="ExerciseIcon">
          <Dumbbell />
        </div>

        <div>
          <h2>Activity Suggestion</h2>

          <p>
            Based on today's nutrition
          </p>
        </div>

      </div>

      <div className="ExerciseCalories">
        {caloriesConsumed} kcal consumed
      </div>

      <div className="ExerciseSuggestion">

        <strong>
          {recommendation.title}
        </strong>

        <p>
          {recommendation.text}
        </p>

      </div>

    </Card>
  );
}