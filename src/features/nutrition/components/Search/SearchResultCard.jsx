import { useDispatch } from "react-redux";

import {
  ChevronRight,
  CookingPot,
  Leaf,
  Package,
  Store,
} from "lucide-react";

import { itemFoodSelected } from "@/features/nutrition/store/thunks";

import "./SearchResultCard.css";


const ICONS = {
  Whole: Leaf,
  Generic: Package,
  Prepared: CookingPot,
  Brand: Store,
};


function formatValue(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return Number.isInteger(number)
    ? String(number)
    : number.toFixed(1);
}


export default function SearchResultCard({ food }) {
  const dispatch = useDispatch();

  const TypeIcon =
    ICONS[food.type] ?? Package;

  const placeholder =
    food.name?.charAt(0).toUpperCase() || "?";


  return (
    <button
      type="button"
      className="SearchResultCard"
      role="option"
      onClick={() =>
        dispatch(itemFoodSelected(food.id))
      }
    >

      <div className="SearchResultImage">

        {food.image ? (
          <img
            src={food.image}
            alt=""
            loading="lazy"
          />
        ) : (
          <span>
            {placeholder}
          </span>
        )}

      </div>


      <div className="SearchResultDetails">

        <div className="SearchResultHeader">

          <div className="SearchResultTitle">

            <h3>
              {food.name}
            </h3>

            {food.brand && (
              <p className="SearchResultBrand">
                {food.brand}
              </p>
            )}

          </div>


          <ChevronRight
            className="SearchResultChevron"
            size={18}
          />

        </div>


        <div className="SearchResultMeta">

          <TypeIcon size={13} />

          <span>
            {food.type}
          </span>

          <span className="SearchResultMetaDot">
            •
          </span>

          <span>
            Per 100 g
          </span>

        </div>


        <div className="SearchResultNutrition">

          <div className="SearchResultNutrient">
            <strong>
              {formatValue(food.calories)}
            </strong>

            <span>
              Kcal
            </span>
          </div>


          <div className="SearchResultNutrient">
            <strong>
              {formatValue(food.carbs)} g
            </strong>

            <span>
              Carbs
            </span>
          </div>


          <div className="SearchResultNutrient">
            <strong>
              {formatValue(food.protein)} g
            </strong>

            <span>
              Protein
            </span>
          </div>


          <div className="SearchResultNutrient">
            <strong>
              {formatValue(food.fat)} g
            </strong>

            <span>
              Fat
            </span>
          </div>

        </div>

      </div>

    </button>
  );
}