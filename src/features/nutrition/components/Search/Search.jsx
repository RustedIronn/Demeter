import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";

import DatePicker from "@/shared/components/DatePicker/DatePicker";
import { selectIsMobile } from "@/app/state/selectors";

import "./Search.css";

export default function Search() {
  const isMobile = useSelector(selectIsMobile);

  return (
    <section className={isMobile ? "Search SearchMobile" : "Search"}>
      <div className="SearchLayout">
        <div className="SearchArea">
          <SearchBar />
          <SearchDropdown />
        </div>

        {!isMobile && <DatePicker />}
      </div>
    </section>
  );
}
