import { useDispatch, useSelector } from "react-redux";

import Card from "@/shared/ui/Card/Card";

import {
  Pencil,
  Trash2,
} from "lucide-react";


import {
  removeItemFood,
} from "@/features/nutrition/store/thunks";


import {
  itemFoodSelectedSet,
  servingSizeSet,
  mealTypeSelectedSet,
  startEditingFood,
} from "@/features/nutrition/store/slice";


import {
  addModalSet,
} from "@/shared/store/uiSlice";


import {
  selectDataPoints,
} from "@/features/profile/store/selectors";


import { capitalizeAll } from "@/shared/utils/utils";


import "./ItemFood.css";



export default function ItemFood({
  item,
  index,
}) {


  const dispatch = useDispatch();


  const dataPoints = useSelector(
    selectDataPoints
  );



  if (!item) return null;



  const {
    image,
    name,
    serving,
    serving_size,
    meal_type,
  } = item;



  const amount =
    serving_size ?? 1;



  const calories =
    Math.round(
      (serving?.calories ?? 0) * amount
    );



  const protein =
    Math.round(
      (serving?.protein ?? 0) * amount
    );



  const carbs =
    Math.round(
      (serving?.carbs ?? 0) * amount
    );



  const fat =
    Math.round(
      (serving?.fat ?? 0) * amount
    );



  const handleDelete = () => {

    dispatch(
      removeItemFood(
        dataPoints,
        index
      )
    );

  };



  const handleEdit = () => {


    dispatch(
      startEditingFood(index)
    );



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



    dispatch(
      servingSizeSet(serving_size)
    );



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



    dispatch(
      addModalSet(true)
    );

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
            {calories} kcal
          </strong>



          <div className="MacroText">

            P {protein}g

            {" • "}

            C {carbs}g

            {" • "}

            F {fat}g

          </div>



          <div className="ItemFoodActions">


            <button
              onClick={handleEdit}
              className="FoodAction EditButton"
            >

              <Pencil size={15}/>

            </button>



            <button
              onClick={handleDelete}
              className="FoodAction DeleteButton"
            >

              <Trash2 size={15}/>

            </button>


          </div>


        </div>


      </div>


    </Card>

  );

}