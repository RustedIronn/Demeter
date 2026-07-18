export const selectPersonal = (state) => state.personal;

export const selectFirstName = (state) => state.personal.first_name;
export const selectLastName = (state) => state.personal.last_name;
export const selectHeight = (state) => state.personal.height_cm;
export const selectWeight = (state) => state.personal.weight_kg;
export const selectDailyGoal = (state) => state.personal.daily_goal;
export const selectDataPoints = (state) => state.personal.data_points;
export const selectIntakeList = (state) => state.personal.intakeList;
export const selectProteinGoal = (state) => state.personal.protein_goal;
export const selectCarbsGoal = (state) => state.personal.carbs_goal;
export const selectFatGoal = (state) => state.personal.fat_goal;
export const selectWaterGoal = (state) => state.personal.waterGoal;