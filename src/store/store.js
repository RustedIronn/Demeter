import { configureStore } from "@reduxjs/toolkit";

import generalReducer from "./general/slice";
import personalReducer from "./personal/slice";
import calculatedInformationReducer from "./calculatedInformation/slice";
import authReducer from "./auth/slice";
import waterReducer from "./personal/water/slice";

const store = configureStore({
  reducer: {
    general: generalReducer,
    personal: personalReducer,
    calculatedInformation: calculatedInformationReducer,
    auth: authReducer,
    water: waterReducer,
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