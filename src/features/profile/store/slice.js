import { createSlice } from "@reduxjs/toolkit";


const initialState = {

  first_name: "",
  last_name: "",

  height_cm: 0,
  weight_kg: 0,

  daily_goal: 0,

  data_points: [],

  waterGoal: 8,

  weight_history: [],

  goal_weight: 0,

  goal_date: null,

  protein_goal: 0,

  carbs_goal: 0,

  fat_goal: 0,

};


const profileSlice = createSlice({

  name: "profile",

  initialState,


  reducers: {


    profileDataSet(state, action) {

      Object.assign(
        state,
        action.payload
      );

    },


    profileUpdated(state, action) {

      Object.assign(
        state,
        action.payload
      );

    },


    dataPointsSet(state, action) {

      state.data_points =
        action.payload;

    },


    waterGoalSet(state, action) {

      state.waterGoal =
        action.payload;

    },


    weightHistorySet(state, action) {

      state.weight_history =
        action.payload;

    },


    goalWeightSet(state, action) {

      state.goal_weight =
        action.payload;

    },


    goalDateSet(state, action) {

      state.goal_date =
        action.payload;

    },


    proteinGoalSet(state, action) {

      state.protein_goal =
        action.payload;

    },


    carbsGoalSet(state, action) {

      state.carbs_goal =
        action.payload;

    },


    fatGoalSet(state, action) {

      state.fat_goal =
        action.payload;

    },


  },

});


export const {

  profileDataSet,

  profileUpdated,

  dataPointsSet,

  waterGoalSet,

  weightHistorySet,

  goalWeightSet,

  goalDateSet,

  proteinGoalSet,

  carbsGoalSet,

  fatGoalSet,

} = profileSlice.actions;


export default profileSlice.reducer;