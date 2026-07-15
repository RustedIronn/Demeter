import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectSearchText,
} from "@/store/general/selectors";

import {
  searchModal,
} from "@/store/general/thunks";

import {
  searchModalSet,
} from "@/store/general/slice";

import "./FoodSearch.css";


export default function FoodSearch() {
  const dispatch = useDispatch();

  const searchText = useSelector(selectSearchText);


  const handleChange = (e) => {
    const value = e.target.value;

    dispatch(
      searchModalSet({
        searchVisible: true,
        searchText: value,
      })
    );

    if (value.trim()) {
      dispatch(searchModal(true, value));
    }
  };


  return (
    <div className="FoodSearch">

      <Search size={20} />

      <input
        type="text"
        placeholder="Search foods..."
        value={searchText}
        onChange={handleChange}
      />

    </div>
  );
}