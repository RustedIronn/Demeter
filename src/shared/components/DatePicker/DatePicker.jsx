import { useDispatch, useSelector } from "react-redux";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { setDate } from "@/app/state/thunks";

import { selectDataPoints } from "@/features/profile/store/selectors";

import { selectSelectedDate } from "@/app/state/selectors";

import "./DatePicker.css";


export default function DatePicker() {
  const dispatch = useDispatch();

  const selectedDate = useSelector(
    selectSelectedDate
  );

  const dataPoints = useSelector(
    selectDataPoints
  );

  const dateSelected = new Date(
    selectedDate
  );

  const today = new Date();

  const isToday =
    today.toDateString() ===
    dateSelected.toDateString();


  const changeDate = (amount) => {
    const newDate = new Date(
      dateSelected
    );

    newDate.setDate(
      newDate.getDate() + amount
    );

    dispatch(
      setDate(
        newDate,
        dataPoints
      )
    );
  };


  const formatted =
    dateSelected.toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
      }
    );


  return (
    <div className="DatePicker">

      <button
        type="button"
        className="DatePickerButton"
        onClick={() => changeDate(-1)}
        aria-label="Previous day"
      >
        <ChevronLeft size={18} />
      </button>


      <div className="DatePickerDate">

        <CalendarDays size={16} />

        <span>
          {formatted}
        </span>

      </div>


      <button
        type="button"
        className="DatePickerButton"
        onClick={() => changeDate(1)}
        disabled={isToday}
        aria-label="Next day"
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
}