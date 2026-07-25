import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/store/slice";
import profileReducer from "@/features/profile/store/slice";
import nutritionReducer from "@/features/nutrition/store/slice";
import goalsReducer from "@/features/goals/store/slice";
import uiReducer from "@/shared/store/uiSlice";


const store = configureStore({

  reducer: {

    auth: authReducer,

    profile: profileReducer,

    nutrition: nutritionReducer,

    goals: goalsReducer,

    ui: uiReducer,

  },

});


export default store;