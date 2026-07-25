import { useMemo } from "react";
import { Dumbbell } from "lucide-react";
import { useSelector } from "react-redux";
import Card from "@/shared/ui/Card/Card";

import "./Exercise.css";

export default function Exercise() {

const caloriesConsumed = useSelector(
  (state) => state.goals.caloriesConsumed
);


  const recommendation = useMemo(() => {

    if (caloriesConsumed <= 500) {

      return {

        title: "Easy Day",

        emoji: "🚶",

        text:
          "A light walk, stretching, or mobility work is a good choice today.",

      };

    }


    if (caloriesConsumed <= 1500) {

      return {

        title: "Stay Active",

        emoji: "🏃",

        text:
          "A moderate workout, brisk walk, cycling, or a gym session would fit well today.",

      };

    }


    return {

      title: "Fuel Available",

      emoji: "💪",

      text:
        "You have plenty of energy available today. If you're training, this is a good day for a longer or more intense session.",

    };

  }, [caloriesConsumed]);


  return (

    <Card className="Exercise">

      <div className="ExerciseHeader">

        <div className="ExerciseIcon">

          <Dumbbell />

        </div>

        <div>

          <h2>
            Activity Suggestion
          </h2>

          <p>
            General guidance for today
          </p>

        </div>

      </div>



      <div className="ExerciseCalories">

        <strong>

          {caloriesConsumed}

        </strong>

        <span>
          kcal consumed
        </span>

      </div>



      <div className="ExerciseSuggestion">

        <div className="SuggestionTitle">

          <span>
            {recommendation.emoji}
          </span>

          <strong>
            {recommendation.title}
          </strong>

        </div>

        <p>

          {recommendation.text}

        </p>

      </div>

    </Card>

  );

}