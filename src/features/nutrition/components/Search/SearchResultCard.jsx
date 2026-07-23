import { useDispatch } from "react-redux";
import Card from "@/shared/ui/Card/Card";
import { itemFoodSelected } from "@/features/nutrition/store/thunks";

import "./SearchResultCard.css";


export default function SearchResultCard({ food }) {
  const dispatch = useDispatch();


  return (
   <div
  className="SearchResultCard"
  onClick={() =>
    dispatch(itemFoodSelected(food.id))
  }
>

      <img
        src={food.image}
        alt={food.name}
        className="SearchResultCardImage"
      />


      <div className="SearchResultCardContent">

        <h3>
          {food.name}
        </h3>


        {food.brand && (
          <p>
            {food.brand}
          </p>
        )}


        {food.description && (
          <span>
            {food.description}
          </span>
        )}

      </div>


    </div>
  );
}