import { nutritionSet } from "./slice";

export const updateCalories =
  (intakeList) => (dispatch) => {
    dispatch(nutritionSet(getNutritionData(intakeList)));
  };

const getNutritionData = (intakeList) => {
  const nutrition = {
    caloriesConsumed: 0,

    proteinConsumed: 0,
    carbsConsumed: 0,
    fatConsumed: 0,

    caloriesByMealType: {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0,
    },
  };

  intakeList.forEach((item) => {
    const multiplier = item.serving_size;

    const calories = Math.round(
      item.serving.calories * multiplier
    );

    nutrition.caloriesConsumed += calories;

    nutrition.proteinConsumed +=
      item.serving.protein * multiplier;

    nutrition.carbsConsumed +=
      item.serving.carbs * multiplier;

    nutrition.fatConsumed +=
      item.serving.fat * multiplier;

    nutrition.caloriesByMealType[item.meal_type] += calories;
  });

  nutrition.proteinConsumed = Math.round(
    nutrition.proteinConsumed
  );

  nutrition.carbsConsumed = Math.round(
    nutrition.carbsConsumed
  );

  nutrition.fatConsumed = Math.round(
    nutrition.fatConsumed
  );

  return nutrition;
};