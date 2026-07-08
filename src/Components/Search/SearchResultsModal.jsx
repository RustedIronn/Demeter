import { useSelector } from "react-redux";
import SearchResultCard from "./SearchResultCard";
import "./SearchResultsModal.css";

import {
  selectSearchVisible,
  selectLoadingSearch,
  selectSearchResults,
} from "../../store/general/selectors";

export default function SearchResultsModal() {
  const loading = useSelector(selectLoadingSearch);
  const foods = useSelector(selectSearchResults);

  return (
    <div className="SearchResultsModal">
      <h4>Search Results</h4>

      {loading && <p>Loading...</p>}

      {!loading &&
        foods.map((food) => (
          <SearchResultCard
            key={food.id}
            food={food}
          />
        ))}
    </div>
  );
}