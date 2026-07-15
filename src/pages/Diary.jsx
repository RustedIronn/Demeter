import Search from "@/components/nutrition/Search/Search";
import DatePicker from "@/components/dashboard/DatePicker/DatePicker";
import ListFood from "@/components/nutrition/ListFood/ListFood";
import AddCard from "@/components/nutrition/AddCard/AddCard";
import SearchResultsModal from "@/components/nutrition/Search/SearchResultsModal";

export default function Diary() {
  return (
    <>
      <Search />
      <DatePicker />
      <ListFood />
      <SearchResultsModal />
      <AddCard />
    </>
  );
}