import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  searchModalSet,
} from "@/shared/store/uiSlice";

import ListFood from "@/features/nutrition/components/ListFood/ListFood";
import AddCard from "@/features/nutrition/components/AddCard/AddCard";
import Search from "@/features/nutrition/components/Search/Search";
import SearchModal from "@/features/nutrition/components/Search/SearchModal";
import DiaryHeader from "@/features/nutrition/components/DiaryHeader/DiaryHeader";

import "./Diary.css";

export default function Diary() {

const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      searchModalSet({
        searchVisible:false,
        searchText:"",
      })
    );
  }, [dispatch]);

  return (
    <div className="Diary">

      <DiaryHeader />

      <Search />

      <ListFood />

      <SearchModal />

      <AddCard />

    </div>
  );
}