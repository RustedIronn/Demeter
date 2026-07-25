export const selectProfile = (state) =>
  state.profile;


export const selectDataPoints = (state) =>
  state.profile.data_points;


export const selectFirstName = (state) =>
  state.profile.first_name;


export const selectLastName = (state) =>
  state.profile.last_name;


export const selectHeight = (state) =>
  state.profile.height_cm;


export const selectWeight = (state) =>
  state.profile.weight_kg;


export const selectDailyGoal = (state) =>
  state.profile.daily_goal;


export const selectProteinGoal = (state) =>
  state.profile.protein_goal;


export const selectCarbsGoal = (state) =>
  state.profile.carbs_goal;


export const selectFatGoal = (state) =>
  state.profile.fat_goal;


export const selectWaterGoal = (state) =>
  state.profile.waterGoal;


export const selectWeightHistory = (state) =>
  state.profile.weight_history;


export const selectGoalWeight = (state) =>
  state.profile.goal_weight;


export const selectGoalDate = (state) =>
  state.profile.goal_date;