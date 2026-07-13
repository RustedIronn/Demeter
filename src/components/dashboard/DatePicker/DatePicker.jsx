import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { setDate } from "@/store/general/thunks";
import {
  selectIsMobile,
  selectSelectedDate,
} from "@/store/general/selectors";
import { selectDataPoints } from "@/store/personal/selectors";

import "./DatePicker.css";

export default function DatePicker() {
  const dispatch = useDispatch();

  const isMobile = useSelector(selectIsMobile);
  const dateSelected = useSelector(selectSelectedDate);
  const dataPoints = useSelector(selectDataPoints);

  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  const beforeYesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 2
  );

  const isToday =
    today.toLocaleDateString().substring(0, 10) ===
    dateSelected.toLocaleDateString().substring(0, 10);

  const isYesterday =
    yesterday.toLocaleDateString().substring(0, 10) ===
    dateSelected.toLocaleDateString().substring(0, 10);

  const isBeforeYesterday =
    beforeYesterday.toLocaleDateString().substring(0, 10) ===
    dateSelected.toLocaleDateString().substring(0, 10);

  const handleNextOnClick = () => {
    const newDate = new Date(
      dateSelected.getFullYear(),
      dateSelected.getMonth(),
      dateSelected.getDate() + 1
    );

    dispatch(setDate(newDate, dataPoints));
  };

  const handleBackOnClick = () => {
    const newDate = new Date(
      dateSelected.getFullYear(),
      dateSelected.getMonth(),
      dateSelected.getDate() - 1
    );

    dispatch(setDate(newDate, dataPoints));
  };

  return (
    <div
      className={`${
        isMobile ? "DatePickerMobile" : "DatePicker"
      } d-flex justify-content-between pl-4 pr-4`}
    >
      <div
        className={`${
          isBeforeYesterday ? "DatePickerIconDisabled " : ""
        }align-self-center text-left DatePickerIcon`}
        onClick={isBeforeYesterday ? undefined : handleBackOnClick}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </div>

      <div className="DatePickerText noselect">
        {isToday && "Today"}

        {isYesterday && "Yesterday"}

        {!isToday && !isYesterday && (
          <span title={dateSelected.toLocaleDateString()}>
            {dateSelected.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        )}
      </div>

      <div
        className={`${
          isToday ? "DatePickerIconDisabled " : ""
        }align-self-center text-right DatePickerIcon`}
        onClick={isToday ? undefined : handleNextOnClick}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    </div>
  );
}