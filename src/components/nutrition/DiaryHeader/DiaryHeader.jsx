import { useSelector } from "react-redux";

import {
  selectSelectedDate,
} from "@/store/general/selectors";

import { CalendarDays } from "lucide-react";

import "./DiaryHeader.css";

export default function DiaryHeader() {
    
  const selectedDate = useSelector(
  selectSelectedDate
);

const formatted =
  selectedDate.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );


  return (
    <div className="DiaryHeader">

      <div>
        <h1>Food Diary</h1>

        <p>
          Track your meals and nutrition
        </p>
      </div>


      <div className="DiaryDate">
        <CalendarDays size={20} />

        <span>
          {formatted}
        </span>
      </div>

    </div>
  );
}