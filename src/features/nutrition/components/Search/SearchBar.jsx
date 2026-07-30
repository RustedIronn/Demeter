import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Command, Loader2, Search } from "lucide-react";

import { searchModal } from "@/features/nutrition/store/thunks";
import { selectSearchText } from "@/features/nutrition/store/selectors";
import {
  selectIsMobile,
  selectLoadingSearch,
  selectSearchVisible,
} from "@/app/state/selectors";

import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  const isMobile = useSelector(selectIsMobile);
  const searchText = useSelector(selectSearchText);
  const searchVisible = useSelector(selectSearchVisible);
  const loading = useSelector(selectLoadingSearch);

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(searchText);
  }, [searchText]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = value.trim();
      dispatch(searchModal(Boolean(query), query));
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, dispatch]);

  function handleKeyDown(event) {
    if (event.key !== "Escape") return;

    setValue("");
    dispatch(searchModal(false, ""));
  }

  return (
    <div className={isMobile ? "SearchBar Mobile" : "SearchBar"}>
      <Search size={22} className="InputSearchIcon" />

      <input
        id="food-search-input"
        className={isMobile ? "SearchInputMobile" : "SearchInput"}
        type="text"
        value={value}
        placeholder="Search foods, ingredients, brands..."
        autoComplete="off"
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-expanded={searchVisible}
        aria-controls="food-search-results"
      />

      <div className="SearchActions">
        {loading ? (
          <Loader2 size={18} className="SearchSpinner" />
        ) : (
          !isMobile && (
            <div className="Shortcut" aria-hidden="true">
              <Command size={14} />
              <span>K</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
