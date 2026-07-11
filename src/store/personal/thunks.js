import { getDateFormatted } from "../../assets/utils/utils";
import {
  loadPersonalStorage,
  savePersonalStorage,
} from "../../assets/utils/storage";
import { data } from "../../data";

import {
  personalDataSet,
  personalUpdated,
  intakeListSet,
  dataPointsSet,
  waterSet,
  waterGoalSet,
} from "./slice";

import { updateCalories } from "../calculatedInformation/thunks";

import {
  setDate,
  searchModal,
} from "../general/thunks";

import {
  mealTypeSelectedSet,
  servingSizeSet,
  addModalSet,
  stopEditingFood,
} from "../general/slice";

export const setPersonalData = () => (dispatch) => {
  const savedData = loadPersonalStorage();

  const personalData = savedData ?? data;

  if (!savedData) {
    savePersonalStorage(personalData);
  }

  dispatch(personalDataSet(personalData));
  dispatch(setIntakeList(personalData.data_points, new Date()));
};

export const updatePersonalData =
  (payload) => (dispatch, getState) => {
    dispatch(personalUpdated(payload));

    persistPersonalData(getState);
  };

export const setIntakeList =
  (dataPoints, date) => (dispatch) => {
    const intakeList = getIntakeList(dataPoints, date);

    dispatch(intakeListSet(intakeList));
    dispatch(updateCalories(intakeList));
  };

const persistPersonalData = (getState) => {
  savePersonalStorage(getState().personal);
};

const buildFoodItem = (
  itemFoodSelected,
  mealTypeSelected,
  servingSize
) => {
  const serving =
    itemFoodSelected.servings[
      itemFoodSelected.selectedServing ?? 0
    ];

  return {
    id: itemFoodSelected.id,
    name: itemFoodSelected.name,
    brand: itemFoodSelected.brand,
    image: itemFoodSelected.image,

    meal_type: mealTypeSelected,

    serving_size: servingSize,

    serving: {
      id: serving.id,
      description: serving.description,

      metricAmount: serving.metricAmount,
      metricUnit: serving.metricUnit,

      calories: serving.calories,
      protein: serving.protein,
      carbs: serving.carbs,
      fat: serving.fat,

      servingAmount: serving.servingAmount,
      servingUnit: serving.servingUnit,
    },
  };
};

export const addItemFood =
  (
    dataPointsOld,
    itemFoodSelected,
    mealTypeSelected,
    servingSize
  ) =>
  (dispatch, getState) => {
    const item = buildFoodItem(
      itemFoodSelected,
      mealTypeSelected,
      servingSize
    );

    const today = new Date();
    const todayFormatted = getDateFormatted(today);

    let added = false;

    const dataPoints = dataPointsOld.map((element) => {
      if (element.date !== todayFormatted) {
        return element;
      }

      added = true;

      return {
        ...element,
        intake_list: [...element.intake_list, item],
      };
    });

    if (!added) {
      dataPoints.push({
        date: todayFormatted,
        intake_list: [item],
      });
    }

    dispatch(dataPointsSet(dataPoints));
    dispatch(setDate(today, dataPoints));

    persistPersonalData(getState);

    dispatch(stopEditingFood());

    dispatch(mealTypeSelectedSet(0));
    dispatch(servingSizeSet(0));
    dispatch(addModalSet(false));
    dispatch(searchModal(false, ""));
  };

export const updateItemFood =
  (
    dataPointsOld,
    itemFoodSelected,
    mealTypeSelected,
    servingSize,
    editingFoodIndex
  ) =>
  (dispatch, getState) => {
    const item = buildFoodItem(
      itemFoodSelected,
      mealTypeSelected,
      servingSize
    );

    const today = new Date();
    const todayFormatted = getDateFormatted(today);

    const dataPoints = dataPointsOld.map((element) => {
      if (element.date !== todayFormatted) {
        return element;
      }

      const intakeList = [...element.intake_list];
      intakeList[editingFoodIndex] = item;

      return {
        ...element,
        intake_list: intakeList,
      };
    });

    dispatch(dataPointsSet(dataPoints));
    dispatch(setDate(today, dataPoints));

    persistPersonalData(getState);

    dispatch(stopEditingFood());

    dispatch(mealTypeSelectedSet(0));
    dispatch(servingSizeSet(0));
    dispatch(addModalSet(false));
    dispatch(searchModal(false, ""));
  };

export const removeItemFood =
  (dataPointsOld, itemIndex) =>
  (dispatch, getState) => {
    const today = new Date();
    const todayFormatted = getDateFormatted(today);

    const dataPoints = dataPointsOld.map((element) => {
      if (element.date !== todayFormatted) {
        return element;
      }

      return {
        ...element,
        intake_list: element.intake_list.filter(
          (_, index) => index !== itemIndex
        ),
      };
    });

    dispatch(dataPointsSet(dataPoints));
    dispatch(setDate(today, dataPoints));

    persistPersonalData(getState);
  };
  
  export const increaseWater =
  () =>
  (dispatch, getState) => {
    const current = getState().personal.water;

    dispatch(waterSet(current + 1));

    persistPersonalData(getState);
  };

export const decreaseWater =
  () =>
  (dispatch, getState) => {
    const current = getState().personal.water;

    if (current === 0) return;

    dispatch(waterSet(current - 1));

    persistPersonalData(getState);
  };

export const resetWater =
  () =>
  (dispatch, getState) => {
    dispatch(waterSet(0));

    persistPersonalData(getState);
  };

export const setWaterGoal =
  (goal) =>
  (dispatch, getState) => {
    dispatch(waterGoalSet(goal));

    persistPersonalData(getState);
  };

export const getIntakeList = (elements, date) => {
  const formattedDate = getDateFormatted(date);

  return (
    elements.find(
      (element) => element.date === formattedDate
    )?.intake_list ?? []
  );
};