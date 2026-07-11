export const selectGeneral = (state) => state.general;

export const selectIsMobile = (state) => state.general.isMobile;
export const selectSearchVisible = (state) => state.general.searchVisible;
export const selectSearchText = (state) => state.general.searchText;
export const selectSearchResults = (state) => state.general.common;
export const selectBrandedResults = (state) => state.general.branded;
export const selectLoadingSearch = (state) => state.general.loadingSearch;
export const selectLoadingAdd = (state) => state.general.loadingAdd;
export const selectSelectedFood = (state) => state.general.itemFoodSelected;
export const selectServingSize = (state) => state.general.servingSize;
export const selectMealType = (state) => state.general.mealTypeSelected;
export const selectSelectedDate = (state) => state.general.dateSelected;
export const selectIsEditingFood = (state) => state.general.isEditingFood;
export const selectEditingFoodIndex = (state) => state.general.editingFoodIndex;