import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";

import { searchModal } from "@/features/nutrition/store/thunks";

import {
  selectIsMobile,
  selectSearchText,
} from "@/features/nutrition/store/selectors";

import "./InputSearch.css";

export default function InputSearch() {

  const dispatch = useDispatch();

  const isMobile = useSelector(
    selectIsMobile
  );

  const searchText = useSelector(
    selectSearchText
  );

  const [value, setValue] =
    useState(searchText);


  useEffect(() => {
    setValue(searchText);
  }, [searchText]);


  useEffect(() => {

    const timeout = setTimeout(() => {

      if (value.trim() === "") {
        dispatch(searchModal(false, ""));
      } else {
        dispatch(searchModal(true, value));
      }

    }, 300);

    return () => clearTimeout(timeout);

  }, [value, dispatch]);


  const handleKeyDown = (e) => {

    if (e.key === "Escape") {

      setValue("");

      dispatch(searchModal(false, ""));

    }

  };


  return (

    <div
      className={
        isMobile
          ? "InputSearch Mobile"
          : "InputSearch"
      }
    >

      <Search
        size={20}
        className="InputSearchIcon"
      />

      <input
        type="text"
        value={value}
        placeholder="Search foods..."
        onChange={(e)=>
          setValue(e.target.value)
        }
        onKeyDown={handleKeyDown}
        className={
          isMobile
            ? "SearchInputMobile"
            : "SearchInput"
        }
      />

    </div>

  );

}