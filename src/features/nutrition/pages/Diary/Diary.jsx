import ListFood from "@/features/nutrition/components/ListFood/ListFood";
import AddCard from "@/features/nutrition/components/AddCard/AddCard";
import Search from "@/features/nutrition/components/Search/Search";
import SearchModal from "@/features/nutrition/components/Search/SearchModal";
import DiaryHeader from "@/features/nutrition/components/DiaryHeader/DiaryHeader";

import "./Diary.css";

export default function Diary() {
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