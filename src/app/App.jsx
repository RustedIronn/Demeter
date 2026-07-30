import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  mobileSet,
} from "@/app/state/uiSlice";

import {
  selectSelectedDate,
} from "@/app/state/selectors";

import {
  setProfileData,
} from "@/features/profile/store/thunks";

import {
  selectDataPoints,
} from "@/features/profile/store/selectors";

import {
  setIntakeList,
} from "@/features/nutrition/store/thunks";

import AppRoutes from "@/app/AppRoutes";


export default function App() {

  const dispatch = useDispatch();

  const dataPoints = useSelector(selectDataPoints);
  const selectedDate = useSelector(selectSelectedDate);


  useEffect(() => {

    const updateWindowDimensions = () => {
      dispatch(
        mobileSet(
          window.innerWidth < 768
        )
      );
    };


    window.addEventListener(
      "resize",
      updateWindowDimensions
    );


    updateWindowDimensions();

    dispatch(setProfileData());


    return () => {
      window.removeEventListener(
        "resize",
        updateWindowDimensions
      );
    };

  }, [dispatch]);


  // Re-derive today's visible intake list whenever the persisted
  // data_points (loaded from storage on boot) or the selected date
  // changes, so the diary actually shows what was saved.
  useEffect(() => {

    dispatch(
      setIntakeList(
        dataPoints,
        selectedDate
      )
    );

  }, [dispatch, dataPoints, selectedDate]);


  return <AppRoutes />;
}