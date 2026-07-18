import DatePicker from "@/features/dashboard/components/DatePicker/DatePicker";
import ListFood from "@/features/nutrition/components/ListFood/ListFood";
import AddCard from "@/features/nutrition/components/AddCard/AddCard";
import SearchResultsModal from "@/features/nutrition/components/Search/SearchResultsModal";
import DiaryHeader from "@/features/nutrition/components/DiaryHeader/DiaryHeader";
import FoodSearch from "@/features/nutrition/components/FoodSearch/FoodSearch";
import Fab from "@/shared/components/Fab/Fab";

import "./Diary.css";

export default function Diary() {
  return (
    <div className="Diary">

      <DiaryHeader />

      <DatePicker />


      <FoodSearch />


      <ListFood />


      <SearchResultsModal />

      <AddCard />

      <Fab />

    </div>
  );
}