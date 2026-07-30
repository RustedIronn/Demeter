import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { searchModalSet } from "@/app/state/uiSlice";

import DiaryHeader from "@/features/nutrition/components/DiaryHeader/DiaryHeader";
import Search from "@/features/nutrition/components/Search/Search";
import ListFood from "@/features/nutrition/components/ListFood/ListFood";
import AddCard from "@/features/nutrition/components/AddCard/AddCard";

import "./Diary.css";

export default function Diary() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      searchModalSet({
        searchVisible: false,
        searchText: "",
      })
    );
  }, [dispatch]);

  return (
    <main className="Diary">
      <DiaryHeader />
      <Search />
      <ListFood />
      <AddCard />
    </main>
  );
}