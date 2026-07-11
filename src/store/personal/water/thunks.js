import {
  waterCurrentSet,
  waterGoalSet,
} from "./slice";

export const increaseWater =
  () => (dispatch, getState) => {
    const current = getState().water.current;

    dispatch(waterCurrentSet(current + 1));
  };

export const decreaseWater =
  () => (dispatch, getState) => {
    const current = getState().water.current;

    if (current > 0) {
      dispatch(waterCurrentSet(current - 1));
    }
  };

export const setWaterGoal =
  (goal) => (dispatch) => {
    dispatch(waterGoalSet(goal));
  };

export const resetWater =
  () => (dispatch) => {
    dispatch(waterCurrentSet(0));
  };