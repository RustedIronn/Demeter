import {
    PERSONAL_DATA_SET,
    INTAKE_LIST_SET,
    ITEM_FOOD_ADD
} from './types';

const initialState = {
    first_name: '',
    last_name: '',
    height_cm: 0,
    weight_kg: 0,
    daily_goal: 0,
    data_points: [],
    intakeList: []
}

export default function personal(state = initialState, action = {}) {
    switch (action.type) {
        case PERSONAL_DATA_SET:
            return { ...state, ...action.data };
        case INTAKE_LIST_SET:
            return { ...state, intakeList: action.intakeList };
        case ITEM_FOOD_ADD:
            return { ...state, data_points: action.dataPoints };
        default:
            return state;
    }
}