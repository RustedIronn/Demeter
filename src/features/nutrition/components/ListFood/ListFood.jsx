import { useSelector } from "react-redux";

import {
  Coffee,
  Utensils,
  Moon,
  Cookie,
} from "lucide-react";

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
        (item) =>
          item.meal_type === meal.key
      ),

  }));


  return (

    <div className="ListFood">

      {grouped.map((meal) => (

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