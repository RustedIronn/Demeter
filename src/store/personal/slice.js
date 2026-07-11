import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  last_name: "",
  height_cm: 0,
  weight_kg: 0,
  daily_goal: 0,

  data_points: [],
  intakeList: [],

  water: 0,
  waterGoal: 8,
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {
    personalDataSet(state, action) {
      Object.assign(state, action.payload);
    },

    personalUpdated(state, action) {
      Object.assign(state, action.payload);
    },

    intakeListSet(state, action) {
      state.intakeList = action.payload;
    },

    dataPointsSet(state, action) {
  state.data_points = action.payload;
    },

    waterSet(state, action) {
  state.water = action.payload;
},

waterGoalSet(state, action) {
  state.waterGoal = action.payload;
},
  },
});

export const {
  personalDataSet,
  personalUpdated,
  intakeListSet,
  dataPointsSet,

  waterSet,
  waterGoalSet,
} = personalSlice.actions;

export default personalSlice.reducer;