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
} from './types';

const initialState = {
    isMobile: false,
    searchVisible: false,
    addVisible: false,
    dateSelected: new Date(),
    searchText: "",
    common: [],
    branded: [],
    loadingSearch: false,
    loadingAdd: false,
    itemFoodSelected: null,
    servingSize: 0,
    mealTypeSelected: 0
}

export default function general(state = initialState, action = {}) {
    switch (action.type) {
        case MOBILE_SET:
            return { ...state, isMobile: action.isMobile };
        case SEARCH_MODAL_SET:
            if (action.searchVisible || (!action.searchVisible && (action.searchText === "")))
                return { ...state, searchVisible: action.searchVisible, searchText: action.searchText };
            else
                return { ...state, searchVisible: action.searchVisible };
        case ADD_MODAL_SET:
            return { ...state, addVisible: action.addVisible };
        case DATE_SET:
            return { ...state, dateSelected: action.dateSelected };
        case LOADING_SEARCH_SET:
            return { ...state, loadingSearch: action.loadingSearch };
        case LOADING_ADD_SET:
            return { ...state, loadingAdd: action.loadingAdd };
        case SEARCH_ITEMS_SET:
            return { ...state, ...action.response };
        case ITEM_FOOD_SELECTED_SET:
            return { ...state, itemFoodSelected: { ...action.itemFoodSelected, serving_size: 0 } };
        case SERVING_SIZE_SET:
            return { ...state, servingSize: action.servingSize };
        case MEAL_TYPE_SELECTED_SET:
            return { ...state, mealTypeSelected: action.mealTypeSelected };
        default:
            return state;
    }
}

