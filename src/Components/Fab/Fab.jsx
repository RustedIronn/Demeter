import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { searchModal } from "../../store/general/thunks";

import "./Fab.css";

export default function Fab() {
  const dispatch = useDispatch();

  const handleAddOnClick = () => {
    document.querySelector(".InputSearchw")?.focus();
    dispatch(searchModal(true, ""));
  };

  return (
    <div className="Fab">
      <button
        className="FabItem FabRotate"
        title="Add Food"
        onClick={handleAddOnClick}
      >
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  );
}