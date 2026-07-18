import { useDispatch, useSelector } from "react-redux";
import Card from "@/shared/ui/Card/Card";
import {
  Pencil,
  Trash2,
} from "lucide-react";

import { removeItemFood } from "@/features/profile/store/thunks";

import { capitalize, capitalizeAll } from "@/shared/utils/utils";

import {
  addModalSet,
  itemFoodSelectedSet,
  servingSizeSet,
  mealTypeSelectedSet,
  startEditingFood,
} from "@/features/nutrition/store/slice";

import "./ItemFood.css";


export default function ItemFood({ item, index }) {
  const dispatch = useDispatch();

  const dataPoints = useSelector(
    (state) => state.personal.data_points
  );


  if (!item) return null;


  const {
    image,
    name,
    serving,
    serving_size,
    meal_type,
  } = item;


  const handleDelete = () => {
    dispatch(removeItemFood(dataPoints, index));
  };


  const handleEdit = () => {
    dispatch(startEditingFood(index));

    dispatch(
      itemFoodSelectedSet({
        ...item,
        servings: [
          {
            ...serving,
          },
        ],
        selectedServing: 0,
      })
    );


    dispatch(servingSizeSet(serving_size));


    const mealTypes = [
      "breakfast",
      "lunch",
      "dinner",
      "snack",
    ];


    dispatch(
      mealTypeSelectedSet(
        mealTypes.indexOf(meal_type)
      )
    );


    dispatch(addModalSet(true));
  };


  return (
    <Card className="ItemFood">

      <div className="ItemFoodImage">

        <img
          src={image}
          alt={name}
        />

      </div>


      <div className="ItemFoodContent">

        <div className="ItemFoodMain">

          <h3>
            {capitalizeAll(name)}
          </h3>


          <span className="MealType">
            {capitalize(meal_type)}
          </span>


          <p>
            {serving_size} {serving.servingUnit}

            {serving.metricAmount &&
              ` (${Math.round(
                serving.metricAmount * serving_size
              )} ${serving.metricUnit})`
            }
          </p>

        </div>



        <div className="ItemFoodStats">

          <strong>
            {Math.round(
              serving.calories * serving_size
            )} kcal
          </strong>


          <div className="MacroText">
            P {Math.round(serving.protein * serving_size)}g

            {" • "}

            C {Math.round(serving.carbs * serving_size)}g

            {" • "}

            F {Math.round(serving.fat * serving_size)}g
          </div>


          <div className="ItemFoodActions">

            <button
              onClick={handleEdit}
              className="EditButton"
            >
              <Pencil size={16}/>
            </button>


            <button
              onClick={handleDelete}
              className="DeleteButton"
            >
              <Trash2 size={16}/>
            </button>

          </div>

        </div>

      </div>

    </Card>
  );
}