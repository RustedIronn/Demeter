import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  caloriesConsumed: 0,
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
    caloriesSet(state, action) {
      return action.payload;
    },
  },
});

export const { caloriesSet } = calculatedInformationSlice.actions;

export default calculatedInformationSlice.reducer;