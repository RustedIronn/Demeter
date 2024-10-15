import {
    PERSONAL_DATA_SET,
    INTAKE_LIST_SET,
    ITEM_FOOD_ADD
} from "./../Reducers/types";
import { getDateFormatted } from './../assets/utils/utils';
import * as actionsCalculatedInformation from './calculatedInformation';
import * as actionsGeneral from './general';

export const personalDataSet = (data) => {
    return (dispatch) => {
        dispatch({
            type: PERSONAL_DATA_SET,
            data: { ...data }
        });
        dispatch(intakeListSet(data.data_points, new Date()));
    }
}

export const intakeListSet = (dataPoints, date) => {
    return (dispatch) => {
        let intakeList = getIntakeList(dataPoints, date);
        dispatch({
            type: INTAKE_LIST_SET,
            intakeList
        });

        dispatch(actionsCalculatedInformation.caloriesSet(intakeList));
    }
}

export const AddItemFoodSet = (dataPointsOld, itemFoodSelected, mealTypeSelected, servingSize) => {
    return (dispatch) => {
        let item = {
            food_name: itemFoodSelected.food_name,
            serving_unit: itemFoodSelected.serving_unit,
            serving_weight_grams: itemFoodSelected.serving_weight_grams,
            serving_qty: itemFoodSelected.serving_qty,
            nf_calories: itemFoodSelected.nf_calories,
            serving_size: servingSize,
            meal_type: mealTypeSelected,
            thumb: itemFoodSelected.photo.thumb
        };

        let dataPoints = [];
        let today = new Date();
        let added = false;

        dataPointsOld.forEach((element) => {
            if (getDateFormatted(today) === element.date) {
                added = true;
                element.intake_list.push(item);
                dataPoints.push({ date: element.date, intake_list: element.intake_list });
            } else
                dataPoints.push(element);
        });

        if (!added) {
            dataPoints.push({ date: getDateFormatted(today), intake_list: [item] });
        }

        dispatch({
            type: ITEM_FOOD_ADD,
            dataPoints
        });

        dispatch(actionsGeneral.DateSet(today, dataPoints))
        dispatch(actionsGeneral.mealTypeSelectedSet(0));
        dispatch(actionsGeneral.servingSizeSet(0));
        dispatch(actionsGeneral.addModalSet(false));
        dispatch(actionsGeneral.searchModalSet(false, ""));
    }
}

export const getIntakeList = (elements, date) => {
    let intakeList = [];

    elements.forEach((element) => {
        if (getDateFormatted(date) === element.date)
            intakeList = element.intake_list;
    });

    return intakeList;
}