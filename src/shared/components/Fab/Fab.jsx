import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";

import { searchModal } from "@/features/nutrition/store/thunks";

import "./Fab.css";

export default function Fab() {
  const dispatch = useDispatch();

  const handleAddOnClick = () => {
    document
      .querySelector(".SearchInput")
      ?.focus();

    document
      .querySelector(".SearchInputMobile")
      ?.focus();

    dispatch(searchModal(true, ""));
  };

  return (
    <div className="Fab">

      <button
        className="FabButton"
        title="Add Food"
        onClick={handleAddOnClick}
      >
        <Plus size={22} />
      </button>

    </div>
  );
}