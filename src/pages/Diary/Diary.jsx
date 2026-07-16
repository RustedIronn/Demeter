import DatePicker from "@/components/dashboard/DatePicker/DatePicker";
import ListFood from "@/components/nutrition/ListFood/ListFood";
import AddCard from "@/components/nutrition/AddCard/AddCard";
import SearchResultsModal from "@/components/nutrition/Search/SearchResultsModal";
import DiaryHeader from "@/components/nutrition/DiaryHeader/DiaryHeader";
import FoodSearch from "@/components/nutrition/FoodSearch/FoodSearch";
import Fab from "@/components/shared/Fab/Fab";

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