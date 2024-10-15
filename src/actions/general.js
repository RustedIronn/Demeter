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
import Constants from './../config';

export const mobileSet = isMobile => ({
    type: MOBILE_SET,
    isMobile
})

export const searchModalSet = (searchVisible, searchText) => {
    return (dispatch) => {
        dispatch({
            type: SEARCH_MODAL_SET,
            searchVisible,
            searchText
        })

        if (searchText !== "") {
            dispatch(loadingSearchSet(true));
            fetch(Constants.API + "/v2/search/instant?query=" + searchText, {
                headers: {
                    "x-user-jwt": Constants.USER_JWT,
                    "x-app-id": Constants.API_ID,
                    "x-app-key": Constants.API_KEY
                }
            }).then(response => response.json()).then((response) => {
                dispatch(searchItemsSet(response));
                dispatch(loadingSearchSet(false));
            });
        }
    }
}

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

export const itemFoodSelectedSet = (serving_qty, serving_unit, food_name) => {
    return (dispatch) => {
        let itemFoodSelected = null;
        dispatch(addModalSet(true));
        dispatch(loadingAddSet(true));
        fetch(Constants.API + "/v2/natural/nutrients", {
            method: 'POST',
            body: '{ "query": "' + serving_qty + ' ' + serving_unit + ' ' + food_name + '" }',
            headers: {
                "x-user-jwt": Constants.USER_JWT,
                "x-app-id": Constants.API_ID,
                "x-app-key": Constants.API_KEY,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        }).then(response => response.json()).then((response) => {
            if (response.foods.length > 0)
                itemFoodSelected = response.foods[0];
            if (itemFoodSelected != null) {
                dispatch({
                    type: ITEM_FOOD_SELECTED_SET,
                    itemFoodSelected
                })
                dispatch(loadingAddSet(false));
            }
        });
    }
}

export const itemFoodSelectedByIdSet = (nix_item_id) => {
    return (dispatch) => {
        let itemFoodSelected = null;
        dispatch(addModalSet(true));
        dispatch(loadingAddSet(true));
        fetch(Constants.API + "/v2/search/item?nix_item_id=" + nix_item_id + "&claims=false", {
            method: 'GET',
            headers: {
                "x-app-id": Constants.API_ID,
                "x-app-key": Constants.API_KEY,
                'Content-Type': 'application/json',
                'accept': 'application/json',

            }
        }).then(response => response.json()).then((response) => {
            if (response.foods.length > 0)
                itemFoodSelected = response.foods[0];
            if (itemFoodSelected != null) {
                dispatch({
                    type: ITEM_FOOD_SELECTED_SET,
                    itemFoodSelected
                })
                dispatch(loadingAddSet(false));
            }
        });
    }
}
