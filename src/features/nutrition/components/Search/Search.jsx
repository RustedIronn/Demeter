import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import DatePicker from "@/features/dashboard/components/DatePicker/DatePicker";

import { selectIsMobile } from "@/shared/store/selectors";

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
        <SearchBar />

        {!isMobile && (
          <DatePicker />
        )}
      </div>
    </section>
  );
}