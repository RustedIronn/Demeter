import { getDateFormatted } from "../../assets/utils/utils";
import {personalDataSet, personalUpdated, intakeListSet, dataPointsSet,} from "./slice";
import { updateCalories } from "../calculatedInformation/thunks";
import { stopEditingFood } from "../general/slice";

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
  (dataPointsOld, itemFoodSelected, mealTypeSelected, servingSize) =>
  (dispatch) => {
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
  (dispatch) => {
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

    dispatch(stopEditingFood());

    dispatch(mealTypeSelectedSet(0));
    dispatch(servingSizeSet(0));
    dispatch(addModalSet(false));
    dispatch(searchModal(false, ""));
  };

export const removeItemFood =
  (dataPointsOld, itemIndex) =>
  (dispatch) => {
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
  };

export const getIntakeList = (elements, date) => {
  const formattedDate = getDateFormatted(date);

  return (
    elements.find((element) => element.date === formattedDate)?.intake_list ?? []
  );
};