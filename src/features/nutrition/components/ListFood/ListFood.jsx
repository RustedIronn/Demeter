import { useSelector } from "react-redux";
import {
  Coffee,
  Utensils,
  Moon,
  Cookie,
} from "lucide-react";

import { selectIntakeList } from "@/features/nutrition/store/selectors";
import MealSection from "@/features/nutrition/components/MealSection/MealSection";

import "./ListFood.css";

const MEALS = [
  {
    key: "breakfast",
    title: "Breakfast",
    icon: Coffee,
  },
  {
    key: "lunch",
    title: "Lunch",
    icon: Utensils,
  },
  {
    key: "dinner",
    title: "Dinner",
    icon: Moon,
  },
  {
    key: "snack",
    title: "Snacks",
    icon: Cookie,
  },
];

export default function ListFood() {
  const intakeList = useSelector(selectIntakeList) ?? [];

  const indexedItems = intakeList.map((item, index) => ({
    ...item,
    originalIndex: index,
  }));

  const groupedMeals = MEALS.map((meal) => ({
    ...meal,
    items: indexedItems.filter(
      (item) => item.meal_type === meal.key
    ),
  }));

  return (
    <div className="ListFood">
      {groupedMeals.map((meal) => (
        <MealSection
          key={meal.key}
          title={meal.title}
          icon={meal.icon}
          mealType={meal.key}
          items={meal.items}
        />
      ))}
    </div>
  );
}