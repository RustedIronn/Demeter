import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Dumbbell, Footprints, PersonStanding } from "lucide-react";

import Card from "@/shared/ui/Card/Card";

import "./Exercise.css";

export default function Exercise() {
  const caloriesConsumed =
    Number(
      useSelector(
        (state) => state.goals.caloriesConsumed
      )
    ) || 0;

  const recommendation = useMemo(() => {
    if (caloriesConsumed <= 500) {
      return {
        title: "Keep It Light",
        text: "A relaxed walk, stretching, or mobility work is a comfortable option today.",
        icon: PersonStanding,
        accent: "var(--color-sage)",
      };
    }

    if (caloriesConsumed <= 1500) {
      return {
        title: "Stay Active",
        text: "A brisk walk, cycling session, or moderate workout could fit well into your day.",
        icon: Footprints,
        accent: "var(--color-success)",
      };
    }

    return {
      title: "Ready to Train",
      text: "A longer gym session or higher-intensity workout may suit you, depending on your energy and recovery.",
      icon: Dumbbell,
      accent: "var(--color-maple)",
    };
  }, [caloriesConsumed]);

  const RecommendationIcon = recommendation.icon;

  return (
    <Card
      className="Exercise"
      style={{ "--exercise-accent": recommendation.accent }}
    >
      <div className="ExerciseHeader">
        <div className="ExerciseIcon">
          <Dumbbell size={22} />
        </div>

        <div>
          <h2>Activity Suggestion</h2>
          <p>General guidance for today</p>
        </div>
      </div>

      <div className="ExerciseCalories">
        <strong>{Math.round(caloriesConsumed)}</strong>
        <span>kcal consumed</span>
      </div>

      <div className="ExerciseSuggestion">
        <div className="SuggestionIcon">
          <RecommendationIcon size={20} />
        </div>

        <div>
          <strong>{recommendation.title}</strong>
          <p>{recommendation.text}</p>
        </div>
      </div>

      <small className="ExerciseNote">
        Choose an activity based on how you feel, not calories alone.
      </small>
    </Card>
  );
}