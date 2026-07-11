import { useDispatch, useSelector } from "react-redux";
import SearchResultCard from "./SearchResultCard";
import { searchModalSet } from "../../store/general/slice";

import {
  selectSearchVisible,
  selectLoadingSearch,
  selectSearchResults,
} from "../../store/general/selectors";

import "../Search/ModalSearch.css";
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
    <div className="ModalSearch">
      <div
        className={
          "ModalSearchContainer " +
          (loading || foods.length === 0 ? "" : "h-100")
        }
      >
        <div
          className={
            "ModalSearchContent " +
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
                  <SearchResultCard key={food.id} food={food} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="ModalSearchBackdrop"
        onClick={closeModal}
      />
    </div>
  );
}