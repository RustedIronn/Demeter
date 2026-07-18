import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";

import Button from "@/shared/ui/Button/Button";

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

      <Button
        className="FabButton"
        title="Add Food"
        onClick={handleAddOnClick}
      >
        <Plus size={22} />
      </Button>

    </div>
  );
}