import { useSelector } from "react-redux";

import MealSection from "@/features/nutrition/components/MealSection/MealSection";

import "./ListFood.css";

const MEALS = [
  {
    key: "breakfast",
    title: "🍳 Breakfast",
  },
  {
    key: "lunch",
    title: "🍛 Lunch",
  },
  {
    key: "dinner",
    title: "🌙 Dinner",
  },
  {
    key: "snack",
    title: "🥤 Snacks",
  },
];

export default function ListFood() {
  const intakeList = useSelector(
    (state) => state.personal.intakeList
  );

  const grouped = MEALS.map((meal) => ({
    ...meal,
    items: intakeList
      .map((item, index) => ({
        ...item,
        originalIndex: index,
      }))
      .filter(
        (item) => item.meal_type === meal.key
      ),
  }));

  return (
    <div className="ListFood">

      {grouped.map((meal) => (
        <MealSection
          key={meal.key}
          title={meal.title}
          mealType={meal.key}
          items={meal.items}
        />
      ))}

    </div>
  );
}