import {
    CALORIES_SET
} from "./../Reducers/types";

export const caloriesSet = (intakeList) => {
    return (dispatch) => {
        let calories = getDataCalories(intakeList);
        dispatch({
            type: CALORIES_SET,
            data: calories
        });
    }
}

export const getDataCalories = (intakeList) => {
    let newState = {
        caloriesConsumed: 0,
        caloriesByMealType: {
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            snack: 0
        }
    }

    intakeList.forEach(element => {
        newState.caloriesConsumed += parseInt((1 / element.serving_qty) * element.nf_calories * element.serving_size);
        newState.caloriesByMealType[element.meal_type] += parseInt((1 / element.serving_qty) * element.nf_calories * element.serving_size);
    });

    return newState;
}

