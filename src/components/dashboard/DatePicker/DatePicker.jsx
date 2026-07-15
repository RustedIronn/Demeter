import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { setDate } from "@/store/general/thunks";

import {
  selectSelectedDate,
} from "@/store/general/selectors";

import {
  selectDataPoints,
} from "@/store/personal/selectors";

import "./DatePicker.css";


export default function DatePicker() {
  const dispatch = useDispatch();

  const dateSelected = useSelector(
    selectSelectedDate
  );

  const dataPoints = useSelector(
    selectDataPoints
  );


  const today = new Date();


  const isToday =
    today.toDateString() ===
    dateSelected.toDateString();


  const handleNext = () => {
    const newDate = new Date(dateSelected);

    newDate.setDate(
      newDate.getDate() + 1
    );

    dispatch(
      setDate(newDate, dataPoints)
    );
  };


  const handleBack = () => {
    const newDate = new Date(dateSelected);

    newDate.setDate(
      newDate.getDate() - 1
    );

    dispatch(
      setDate(newDate, dataPoints)
    );
  };


  const formatted =
    dateSelected.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "short",
        day: "numeric",
      }
    );


  return (
    <div className="DatePicker">

      <button
        className="DatePickerButton"
        onClick={handleBack}
      >
        <ChevronLeft size={20}/>
      </button>


      <div className="DatePickerDate">

        <span>
          {isToday
            ? "Today"
            : formatted}
        </span>

      </div>


      <button
        className="DatePickerButton"
        onClick={isToday ? undefined : handleNext}
        disabled={isToday}
      >
        <ChevronRight size={20}/>
      </button>


    </div>
  );
}