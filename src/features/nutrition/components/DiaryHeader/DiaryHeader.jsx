import { useSelector } from "react-redux";
import { CalendarDays } from "lucide-react";

import { selectSelectedDate } from "@/app/state/selectors";

import "./DiaryHeader.css";

export default function DiaryHeader() {
  const selectedDate = useSelector(selectSelectedDate);

  const date = new Date(selectedDate);

  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="DiaryHeader">
      <div className="DiaryHeaderContent">
        <h1>Food Diary</h1>
        <p>Track your meals and nutrition.</p>
      </div>

      <div className="DiaryDate">
        <CalendarDays size={18} />
        <span>{formatted}</span>
      </div>
    </header>
  );
}