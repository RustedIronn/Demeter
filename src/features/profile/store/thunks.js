import { getDateFormatted } from "@/shared/utils/utils";
import {
  loadPersonalStorage,
  savePersonalStorage,
} from "@/shared/utils/storage";
import { data } from "@/shared/constants/data";

import {
  personalDataSet,
  personalUpdated,
  intakeListSet,
  dataPointsSet, 
  weightHistorySet,
  goalWeightSet,
  goalDateSet,
  proteinGoalSet,
  carbsGoalSet,
  fatGoalSet,
} from "./slice";

import { updateCalories } from "../../goals/store/thunks";

import {
  setDate,
  searchModal,
} from "@/features/nutrition/store/thunks";

import {
  mealTypeSelectedSet,
  servingSizeSet,
  addModalSet,
  stopEditingFood,
} from "@/features/nutrition/store/slice";

export const setPersonalData = () => (dispatch) => {
  const savedData = loadPersonalStorage();

  const personalData = savedData ?? data;

  if (!savedData) {
    savePersonalStorage(personalData);
  }

  const selectedDate = new Date();

dispatch(personalDataSet(personalData));
dispatch(setIntakeList(personalData.data_points, selectedDate));
};

export const updatePersonalData =
  (payload) => (dispatch, getState) => {
    const oldWeight = getState().personal.weight_kg;

    dispatch(personalUpdated(payload));

    if (
  payload.weight_kg !== undefined &&
  payload.weight_kg !== oldWeight
) {
      const history =
        getState().personal.weight_history ?? [];

      const selectedDate =
  getState().general.dateSelected;

const selectedDateFormatted =
  getDateFormatted(selectedDate);

const newEntry = {
  date: selectedDateFormatted,
  weight: payload.weight_kg,
};

const existingIndex = history.findIndex(
  (entry) =>
    entry.date === selectedDateFormatted
);

      let updatedHistory;

      if (existingIndex !== -1) {
        updatedHistory = [...history];
        updatedHistory[existingIndex] = newEntry;
      } else {
        updatedHistory = [...history, newEntry];
      }

      dispatch(weightHistorySet(updatedHistory));
    }

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

    const selectedDate =
  getState().general.dateSelected;

const selectedDateFormatted =
  getDateFormatted(selectedDate);

    let added = false;

    const dataPoints = dataPointsOld.map((element) => {
      if (element.date !== selectedDateFormatted) {
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
        date: selectedDateFormatted,
        intake_list: [item],
      });
    }

    dispatch(dataPointsSet(dataPoints));
    dispatch(setDate(selectedDate, dataPoints));

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

    const selectedDate =
  getState().general.dateSelected;

const selectedDateFormatted =
  getDateFormatted(selectedDate);

    const dataPoints = dataPointsOld.map((element) => {
      if (element.date !== selectedDateFormatted) {
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
    dispatch(setDate(selectedDate, dataPoints));

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
    const selectedDate =
  getState().general.dateSelected;

const selectedDateFormatted =
  getDateFormatted(selectedDate);

    const dataPoints = dataPointsOld.map((element) => {
      if (element.date !== selectedDateFormatted) {
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
    dispatch(setDate(selectedDate, dataPoints));

    persistPersonalData(getState);
  };
  
export const increaseWater =
  () =>
  (dispatch, getState) => {
    const selectedDate = getState().general.dateSelected;
    const selectedDateFormatted =
      getDateFormatted(selectedDate);

    let found = false;

    const dataPoints = getState().personal.data_points.map(
      (day) => {
        if (day.date !== selectedDateFormatted) {
          return day;
        }

        found = true;

        return {
          ...day,
          water: (day.water ?? 0) + 1,
        };
      }
    );

    if (!found) {
      dataPoints.push({
        date: selectedDateFormatted,
        intake_list: [],
        water: 1,
      });
    }

    dispatch(dataPointsSet(dataPoints));

    persistPersonalData(getState);
  };

export const decreaseWater =
  () =>
  (dispatch, getState) => {
    const selectedDate = getState().general.dateSelected;
    const selectedDateFormatted = getDateFormatted(selectedDate);

    let found = false;

    const dataPoints = getState().personal.data_points.map((day) => {
      if (day.date !== selectedDateFormatted) {
        return day;
      }

      found = true;

      return {
        ...day,
        water: Math.max((day.water ?? 0) - 1, 0),
      };
    });

    if (!found) {
      dataPoints.push({
        date: selectedDateFormatted,
        intake_list: [],
        water: 0,
      });
    }

    dispatch(dataPointsSet(dataPoints));

    persistPersonalData(getState);
  };

export const resetWater =
  () =>
  (dispatch, getState) => {
    const selectedDate = getState().general.dateSelected;
    const selectedDateFormatted = getDateFormatted(selectedDate);

    let found = false;

    const dataPoints = getState().personal.data_points.map((day) => {
      if (day.date !== selectedDateFormatted) {
        return day;
      }

      found = true;

      return {
        ...day,
        water: 0,
      };
    });

    if (!found) {
      dataPoints.push({
        date: selectedDateFormatted,
        intake_list: [],
        water: 0,
      });
    }

    dispatch(dataPointsSet(dataPoints));

    persistPersonalData(getState);
  };

  export const setGoalWeight =
  (weight) =>
  (dispatch, getState) => {
    dispatch(goalWeightSet(weight));

    persistPersonalData(getState);
  };

export const setGoalDate =
  (date) =>
  (dispatch, getState) => {
    dispatch(goalDateSet(date));

    persistPersonalData(getState);
  };

export const setProteinGoal =
  (goal) =>
  (dispatch, getState) => {
    dispatch(proteinGoalSet(goal));

    persistPersonalData(getState);
  };

export const setCarbsGoal =
  (goal) =>
  (dispatch, getState) => {
    dispatch(carbsGoalSet(goal));

    persistPersonalData(getState);
  };

export const setFatGoal =
  (goal) =>
  (dispatch, getState) => {
    dispatch(fatGoalSet(goal));

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