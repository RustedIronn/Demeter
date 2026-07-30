import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import SearchFilters from "./SearchFilters";
import SearchResultCard from "./SearchResultCard";

import { selectSearchResults } from "@/features/nutrition/store/selectors";
import {
  selectLoadingSearch,
  selectSearchVisible,
} from "@/app/state/selectors";

import "./SearchDropdown.css";

export default function SearchDropdown() {
  const visible = useSelector(selectSearchVisible);
  const loading = useSelector(selectLoadingSearch);
  const foods = useSelector(selectSearchResults);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setFilter("all");
  }, [foods]);

  const filteredFoods = useMemo(() => {
    if (filter === "all") return foods;

    return foods.filter(
      (food) => food.type?.toLowerCase() === filter
    );
  }, [foods, filter]);

  if (!visible) return null;

  return (
    <div
      id="food-search-results"
      className="SearchDropdown"
      role="listbox"
    >
      {loading && <div className="SearchLoading">Searching...</div>}

      {!loading && foods.length === 0 && (
        <div className="SearchEmpty">No foods found.</div>
      )}

      {!loading && foods.length > 0 && (
        <>
          <SearchFilters
            foods={foods}
            filter={filter}
            setFilter={setFilter}
          />

          <div className="SearchResultsList">
            {filteredFoods.map((food) => (
              <SearchResultCard key={food.id} food={food} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
