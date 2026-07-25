export const selectNutrition = (state) =>
  state.nutrition;


export const selectSearchText = (state) =>
  state.nutrition.searchText;


export const selectSearchResults = (state) =>
  state.nutrition.common;


export const selectBrandedResults = (state) =>
  state.nutrition.branded;


export const selectLoadingSearch = (state) =>
  state.nutrition.loadingSearch;

export const selectIntakeList = (state) =>
  state.nutrition.intakeList;

export const selectLoadingAdd = (state) =>
  state.nutrition.loadingAdd;


export const selectSelectedFood = (state) =>
  state.nutrition.itemFoodSelected;


export const selectServingSize = (state) =>
  state.nutrition.servingSize;

export const selectMealType = (state) =>
  state.nutrition.mealTypeSelected;


export const selectIsEditingFood = (state) =>
  state.nutrition.isEditingFood;


export const selectEditingFoodIndex = (state) =>
  state.nutrition.editingFoodIndex;