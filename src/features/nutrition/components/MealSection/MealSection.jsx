import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";

import Button from "@/shared/ui/Button/Button";
import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";
import EmptyState from "@/shared/ui/EmptyState/EmptyState";
import ItemFood from "@/features/nutrition/components/ItemFood/ItemFood";
import { mealTypeSelectedSet } from "@/features/nutrition/store/slice";
import { searchModalSet } from "@/app/state/uiSlice";

import "./MealSection.css";

const MEAL_INDEXES = {
  breakfast: 0,
  lunch: 1,
  dinner: 2,
  snack: 3,
};

export default function MealSection({ title, items = [], mealType, icon: Icon }) {
  const dispatch = useDispatch();

  const totals = items.reduce(
    (acc, item) => {
      const amount = Number(item.serving_size) || 1;
      acc.calories += Number(item.serving?.calories || 0) * amount;
      acc.protein += Number(item.serving?.protein || 0) * amount;
      acc.carbs += Number(item.serving?.carbs || 0) * amount;
      acc.fat += Number(item.serving?.fat || 0) * amount;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const openSearch = () => {
    dispatch(mealTypeSelectedSet(MEAL_INDEXES[mealType] ?? 0));
    dispatch(searchModalSet({ searchVisible: false, searchText: "" }));
    requestAnimationFrame(() => {
      document.getElementById("food-search-input")?.focus();
    });
  };

  const subtitle = items.length
    ? `${Math.round(totals.calories)} kcal • P ${Math.round(totals.protein)}g • C ${Math.round(totals.carbs)}g • F ${Math.round(totals.fat)}g`
    : undefined;

  return (
    <Card className="MealSection">
      <CardHeader
        className="MealSectionHeader"
        icon={Icon ? <Icon size={18} /> : null}
        title={title}
        subtitle={subtitle}
        action={
          items.length > 0 ? (
            <Button variant="ghost" size="sm" onClick={openSearch}>
              <Plus size={16} />
              Add food
            </Button>
          ) : null
        }
      />

      {items.length === 0 ? (
        <EmptyState
          compact
          icon={Icon ? <Icon size={22} /> : null}
          title={`No ${mealType} logged yet`}
          description={`Add your first food to ${mealType}.`}
          action={
            <Button size="sm" onClick={openSearch}>
              <Plus size={16} />
              Add {title}
            </Button>
          }
        />
      ) : (
        <div className="MealItems">
          {items.map((item, index) => (
            <ItemFood
              key={item.id ?? `${mealType}-${index}`}
              item={item}
              index={item.originalIndex ?? index}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
