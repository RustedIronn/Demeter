import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

const calculatedInformationSlice = createSlice({
  name: "calculatedInformation",
  initialState,
  reducers: {
    nutritionSet(state, action) {
      return action.payload;
    },
  },
});

export const { nutritionSet } = calculatedInformationSlice.actions;

export default calculatedInformationSlice.reducer;