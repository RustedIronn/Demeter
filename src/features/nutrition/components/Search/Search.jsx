import { useSelector } from "react-redux";

import InputSearch from "./InputSearch";
import DatePicker from "@/features/dashboard/components/DatePicker/DatePicker";

import { selectIsMobile } from "@/features/nutrition/store/selectors";

import "./Search.css";

export default function Search() {
  const isMobile = useSelector(selectIsMobile);

  return (
    <section
      className={
        isMobile
          ? "Search SearchMobile"
          : "Search"
      }
    >
      <div className="SearchContent">

        <InputSearch />

        {!isMobile && (
          <DatePicker />
        )}

      </div>
    </section>
  );
}