import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  mobileSet,
} from "@/features/nutrition/store/slice";

import {
  setPersonalData,
} from "@/features/profile/store/thunks";

import AppRoutes from "@/app/AppRoutes";


export default function App() {

  const dispatch = useDispatch();


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

    dispatch(setPersonalData());


    return () => {
      window.removeEventListener(
        "resize",
        updateWindowDimensions
      );
    };

  }, [dispatch]);


  return <AppRoutes />;
}