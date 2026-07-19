import DatePicker from "@/features/dashboard/components/DatePicker/DatePicker";
import ListFood from "@/features/nutrition/components/ListFood/ListFood";
import AddCard from "@/features/nutrition/components/AddCard/AddCard";
import Search from "@/features/nutrition/components/Search/Search";
import SearchModal from "@/features/nutrition/components/Search/SearchModal";
import DiaryHeader from "@/features/nutrition/components/DiaryHeader/DiaryHeader";
import SearchBar from "@/features/nutrition/components/Search/SearchBar";

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