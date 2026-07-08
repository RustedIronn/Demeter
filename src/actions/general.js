import {
    MOBILE_SET,
    SEARCH_MODAL_SET,
    DATE_SET,
    LOADING_SEARCH_SET,
    SEARCH_ITEMS_SET,
    ADD_MODAL_SET,
    ITEM_FOOD_SELECTED_SET,
    LOADING_ADD_SET,
    SERVING_SIZE_SET,
    MEAL_TYPE_SELECTED_SET
} from "./../Reducers/types";
import * as actionsPersonalData from './personalData';
import { searchFoods } from "../api/demeter";

export const mobileSet = isMobile => ({
    type: MOBILE_SET,
    isMobile
})

export const searchModalSet = (searchVisible, searchText) => {
    return async (dispatch) => {
        dispatch({
            type: SEARCH_MODAL_SET,
            searchVisible,
            searchText
        });

        if (!searchText.trim()) return;

        dispatch(loadingSearchSet(true));

        try {
            const foods = await searchFoods(searchText);

            dispatch(searchItemsSet({
                common: foods,
                branded: []
            }));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(loadingSearchSet(false));
        }
    };
};

export const DateSet = (dateSelected, dataPoints) => {
    return (dispatch) => {
        dispatch({
            type: DATE_SET,
            dateSelected
        });
        dispatch(actionsPersonalData.intakeListSet(dataPoints, dateSelected))
    }
}

export const addModalSet = (addVisible) => ({
    type: ADD_MODAL_SET,
    addVisible
})

export const loadingSearchSet = (loadingSearch) => ({
    type: LOADING_SEARCH_SET,
    loadingSearch
})

export const searchItemsSet = (response) => ({
    type: SEARCH_ITEMS_SET,
    response
})

export const loadingAddSet = (loadingAdd) => ({
    type: LOADING_ADD_SET,
    loadingAdd
})

export const servingSizeSet = (servingSize) => ({
    type: SERVING_SIZE_SET,
    servingSize
})

export const mealTypeSelectedSet = (mealTypeSelected) => ({
    type: MEAL_TYPE_SELECTED_SET,
    mealTypeSelected
})

export const itemFoodSelectedSet = () => {
    return () => {
        console.warn("TODO: Replace Nutritionix item lookup.");
    };
};

export const itemFoodSelectedByIdSet = () => {
    return () => {
        console.warn("TODO: Replace Nutritionix item lookup.");
    };
};
