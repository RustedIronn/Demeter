import { dateSet } from "./uiSlice";

import {
  setIntakeList,
} from "@/features/nutrition/store/thunks";


export const setDate =
(dateSelected, dataPoints) =>
(dispatch) => {

  dispatch(
    dateSet(
      dateSelected.toISOString() 
    )
  );


  dispatch(
    setIntakeList(
      dataPoints,
      dateSelected
    )
  );

};