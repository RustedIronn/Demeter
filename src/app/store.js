import { configureStore } from "@reduxjs/toolkit";

import generalReducer from "@/features/nutrition/store/slice";
import personalReducer from "../features/profile/store/slice";
import calculatedInformationReducer from "../features/goals/store/slice";
import authReducer from "../features/auth/store/slice";

const store = configureStore({
  reducer: {
    general: generalReducer,
    personal: personalReducer,
    calculatedInformation: calculatedInformationReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["general.dateSelected"],
        ignoredActions: ["general/dateSet"],
      },
    }),
});

export default store;