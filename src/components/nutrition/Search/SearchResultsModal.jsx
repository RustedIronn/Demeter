import { useDispatch, useSelector } from "react-redux";

import { searchModalSet } from "@/store/general/slice";
import {
  selectLoadingSearch,
  selectSearchResults,
  selectSearchVisible,
} from "@/store/general/selectors";

import SearchResultCard from "./SearchResultCard";

import "./SearchResultsModal.css";

export default function SearchResultsModal() {
  const dispatch = useDispatch();

  const searchVisible = useSelector(selectSearchVisible);
  const loading = useSelector(selectLoadingSearch);
  const foods = useSelector(selectSearchResults);

  const closeModal = () => {
    dispatch(searchModalSet(false));
  };

  if (!searchVisible) return null;

  return (
    <div className="SearchResultsModalOverlay">
      <div
        className={
          "SearchResultsModalContainer " +
          (loading || foods.length === 0 ? "" : "h-100")
        }
      >
        <div
          className={
            "SearchResultsModalContent " +
            (loading || foods.length === 0 ? "" : "h-100")
          }
        >
          <div
            style={{
              overflowY: "auto",
              height: "100%",
            }}
          >
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
          </div>
        </div>
      </div>

      <div
        className="SearchResultsModalBackdrop"
        onClick={closeModal}
      />
    </div>
  );
}