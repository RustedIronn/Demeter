import { getDateFormatted } from "../../assets/utils/utils";
import { personalUpdated } from "./slice";

import {
  personalDataSet,
  intakeListSet,
  itemFoodAdd,
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
} from "../general/slice";

export const setPersonalData = (data) => (dispatch) => {
  dispatch(personalDataSet({ ...data }));
  dispatch(setIntakeList(data.data_points, new Date()));
};

export const updatePersonalData =
  (payload) => (dispatch) => {
    dispatch(personalUpdated(payload));
  };

export const setIntakeList =
  (dataPoints, date) => (dispatch) => {
    const intakeList = getIntakeList(dataPoints, date);

    dispatch(intakeListSet(intakeList));
    dispatch(updateCalories(intakeList));
  };

export const addItemFood =
  (dataPointsOld, itemFoodSelected, mealTypeSelected, servingSize) =>
  (dispatch) => {
   const serving =
  itemFoodSelected.servings[itemFoodSelected.selectedServing ?? 0];

const item = {
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

    dispatch(itemFoodAdd(dataPoints));

    dispatch(setDate(today, dataPoints));

    dispatch(mealTypeSelectedSet(0));
    dispatch(servingSizeSet(0));
    dispatch(addModalSet(false));
    dispatch(searchModal(false, ""));
  };

export const getIntakeList = (elements, date) => {
  const formattedDate = getDateFormatted(date);

  return (
    elements.find((element) => element.date === formattedDate)?.intake_list ?? []
  );
};