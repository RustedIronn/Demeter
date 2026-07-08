import "./SearchResultCard.css";

import { useDispatch } from "react-redux";
import { itemFoodSelected } from "../../store/general/thunks";

export default function SearchResultCard({ food }) {
  const dispatch = useDispatch();

  return (
    <div
      className="SearchResultCard"
      onClick={() => dispatch(itemFoodSelected(food.id))}
    >
      <img
        src={food.image}
        alt={food.name}
        className="SearchResultCardImage"
      />

      <div className="SearchResultCardContent">
        <h5>{food.name}</h5>

        {food.brand && <p>{food.brand}</p>}

        {food.description && <small>{food.description}</small>}
      </div>
    </div>
  );
}