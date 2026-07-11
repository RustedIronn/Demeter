import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: 0,
  goal: 8,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    waterSet(state, action) {
      return action.payload;
    },

    waterCurrentSet(state, action) {
      state.current = action.payload;
    },

    waterGoalSet(state, action) {
      state.goal = action.payload;
    },
  },
});

export const {
  waterSet,
  waterCurrentSet,
  waterGoalSet,
} = waterSlice.actions;

export default waterSlice.reducer;