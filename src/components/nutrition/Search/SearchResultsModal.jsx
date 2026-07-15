import { useDispatch, useSelector } from "react-redux";

import {
  X,
} from "lucide-react";

import {
  searchModalSet,
} from "@/store/general/slice";

import {
  selectLoadingSearch,
  selectSearchResults,
  selectSearchVisible,
} from "@/store/general/selectors";

import SearchResultCard from "./SearchResultCard";

import "./SearchResultsModal.css";


export default function SearchResultsModal() {
  const dispatch = useDispatch();


  const searchVisible = useSelector(
    selectSearchVisible
  );

  const loading = useSelector(
    selectLoadingSearch
  );

  const foods = useSelector(
    selectSearchResults
  );


  const closeModal = () => {
    dispatch(
      searchModalSet({
        searchVisible: false,
        searchText: "",
      })
    );
  };


  if (!searchVisible) return null;


  return (
    <div className="SearchResultsModalOverlay">


      <div className="SearchResultsModalContainer">


        <div className="SearchResultsModalContent">


          <div className="SearchResultsModalHeader">

            <h2>
              Search Results
            </h2>


            <button
              onClick={closeModal}
              className="SearchResultsClose"
            >
              <X size={20}/>
            </button>

          </div>



          <div className="SearchResultsList">


            {loading && (
              <p className="SearchLoading">
                Searching...
              </p>
            )}



            {!loading &&
              foods.length === 0 && (

              <p className="SearchEmpty">
                No foods found.
              </p>

            )}



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


      <div
        className="SearchResultsModalBackdrop"
        onClick={closeModal}
      />

    </div>
  );
}