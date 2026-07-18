import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  last_name: "",
  height_cm: 0,
  weight_kg: 0,
  daily_goal: 0,

  data_points: [],
  intakeList: [],

  waterGoal: 8,

  weight_history: [],

  goal_weight: 0,
  goal_date: null,

  protein_goal: 0,
  carbs_goal: 0,
  fat_goal: 0,
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
  const { date, water } = action.payload;

  const day = state.data_points.find(
    (item) => item.date === date
  );

  if (day) {
    day.water = water;
  }
},

waterGoalSet(state, action) {
  state.waterGoal = action.payload;
},

weightHistorySet(state, action) {
  state.weight_history = action.payload;
},

goalWeightSet(state, action) {
  state.goal_weight = action.payload;
},

goalDateSet(state, action) {
  state.goal_date = action.payload;
},

proteinGoalSet(state, action) {
  state.protein_goal = action.payload;
},

carbsGoalSet(state, action) {
  state.carbs_goal = action.payload;
},

fatGoalSet(state, action) {
  state.fat_goal = action.payload;
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
  weightHistorySet,
  goalWeightSet,
  goalDateSet,
  proteinGoalSet,
  carbsGoalSet,
  fatGoalSet,
} = personalSlice.actions;

export default personalSlice.reducer;