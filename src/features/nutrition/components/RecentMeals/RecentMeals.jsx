import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Utensils } from "lucide-react";

import Button from "@/shared/ui/Button/Button";
import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";
import EmptyState from "@/shared/ui/EmptyState/EmptyState";
import { selectIntakeList } from "@/features/nutrition/store/selectors";

import "./RecentMeals.css";

export default function RecentMeals() {
  const intakeList = useSelector(selectIntakeList) ?? [];
  const navigate = useNavigate();
  const recentMeals = [...intakeList].slice(-4).reverse();
  const openDiary = () => navigate("/diary");

  const getCalories = (item) => {
    const calories = Number(item.serving?.calories) || 0;
    const amount = Number(item.serving_size) || 1;
    return Math.round(calories * amount);
  };

  return (
    <Card className="RecentMeals">
      <CardHeader
        title="Recent Meals"
        subtitle="Your latest logged foods"
        action={
          <Button variant="ghost" size="sm" onClick={openDiary}>
            View diary
            <ArrowRight size={16} />
          </Button>
        }
      />

      {recentMeals.length === 0 ? (
        <EmptyState
          icon={<Utensils size={22} />}
          title="No meals tracked yet"
          description="Add your first food to start tracking your nutrition."
          action={
            <Button size="sm" onClick={openDiary}>
              Add food
            </Button>
          }
        />
      ) : (
        <div className="RecentMealsList">
          {recentMeals.map((item, index) => (
            <button
              type="button"
              className="RecentMealItem"
              key={item.id ?? `${item.name}-${index}`}
              onClick={openDiary}
            >
              <div className="RecentMealInfo">
                <h3>{item.name}</h3>
                <span>{item.meal_type}</span>
              </div>
              <strong>{getCalories(item)} kcal</strong>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
