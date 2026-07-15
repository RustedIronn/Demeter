import { useDispatch } from "react-redux";

import { itemFoodSelected } from "@/store/general/thunks";

import "./SearchResultCard.css";


export default function SearchResultCard({ food }) {
  const dispatch = useDispatch();


  return (
    <button
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


    </button>
  );
}