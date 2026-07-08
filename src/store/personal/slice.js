import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  last_name: "",
  height_cm: 0,
  weight_kg: 0,
  daily_goal: 0,
  data_points: [],
  intakeList: [],
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {
    personalDataSet(state, action) {
      Object.assign(state, action.payload);
    },

    intakeListSet(state, action) {
      state.intakeList = action.payload;
    },

    itemFoodAdd(state, action) {
      state.data_points = action.payload;
    },
  },
});

export const {
  personalDataSet,
  intakeListSet,
  itemFoodAdd,
} = personalSlice.actions;

export default personalSlice.reducer;