import { caloriesSet } from "./slice";

export const updateCalories = (intakeList) => (dispatch) => {
  dispatch(caloriesSet(getDataCalories(intakeList)));
};

const getDataCalories = (intakeList) => {
  const calories = {
    caloriesConsumed: 0,
    caloriesByMealType: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0,
    },
  };

  intakeList.forEach((item) => {
    const value = Math.round(
      (item.nf_calories * item.serving_size) / item.serving_qty
    );

    calories.caloriesConsumed += value;
    calories.caloriesByMealType[item.meal_type] += value;
  });

  return calories;
};