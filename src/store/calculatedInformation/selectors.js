export const selectCalculatedInformation = (state) =>
  state.calculatedInformation;

export const selectCaloriesConsumed = (state) =>
  state.calculatedInformation.caloriesConsumed;

export const selectCaloriesByMealType = (state) =>
  state.calculatedInformation.caloriesByMealType;