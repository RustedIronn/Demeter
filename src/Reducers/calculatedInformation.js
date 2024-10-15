import {
    CALORIES_SET
} from './types';

const initialState = {
    caloriesConsumed: 0,
    caloriesByMealType: {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0
    }
}

export default function calculatedInformation(state = initialState, action = {}) {
    switch (action.type) {
        case CALORIES_SET:
            return { ...action.data }
        default:
            return state;
    }
}

