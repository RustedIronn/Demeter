import { getDateFormatted } from "../../assets/utils/utils";

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

export const setIntakeList =
  (dataPoints, date) => (dispatch) => {
    const intakeList = getIntakeList(dataPoints, date);

    dispatch(intakeListSet(intakeList));
    dispatch(updateCalories(intakeList));
  };

export const addItemFood =
  (dataPointsOld, itemFoodSelected, mealTypeSelected, servingSize) =>
  (dispatch) => {
    const item = {
      food_name: itemFoodSelected.food_name,
      serving_unit: itemFoodSelected.serving_unit,
      serving_weight_grams: itemFoodSelected.serving_weight_grams,
      serving_qty: itemFoodSelected.serving_qty,
      nf_calories: itemFoodSelected.nf_calories,
      serving_size: servingSize,
      meal_type: mealTypeSelected,
      thumb: itemFoodSelected.photo?.thumb ?? "",
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