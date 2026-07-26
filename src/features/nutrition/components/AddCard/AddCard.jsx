import { useDispatch, useSelector } from "react-redux";

import Button from "@/shared/ui/Button/Button";

import {
  servingSizeSet,
  mealTypeSelectedSet,
  stopEditingFood,
} from "@/features/nutrition/store/slice";

import {
  addModalSet,
} from "@/shared/store/uiSlice";


import {
  addItemFood,
  updateItemFood,
} from "@/features/nutrition/store/thunks";


import {
  selectDataPoints,
} from "@/features/profile/store/selectors";


import {
  selectSelectedFood,
  selectServingSize,
  selectMealType,
  selectIsEditingFood,
  selectEditingFoodIndex,
} from "@/features/nutrition/store/selectors";


import {
  selectAddVisible,
  selectLoadingAdd,
} from "@/shared/store/selectors";


import {
  selectCaloriesByMealType,
} from "@/features/goals/store/selectors";


import ModalPortal from "@/shared/components/Modal/ModalPortal";
import Modal from "@/shared/components/Modal/Modal";
import Loading from "@/shared/components/Loading/Loading";
import InputNumberCustom from "@/features/nutrition/components/InputNumberCustom/InputNumberCustom";

import { capitalize } from "@/shared/utils/utils";

import "./AddCard.css";


export default function AddCard() {

  const dispatch = useDispatch();


  const dataPoints = useSelector(
    selectDataPoints
  );


  const addVisible = useSelector(
    selectAddVisible
  );


  const loadingAdd = useSelector(
    selectLoadingAdd
  );


  const itemFoodSelected = useSelector(
    selectSelectedFood
  );


  const servingSize = useSelector(
    selectServingSize
  );

  const mealTypeSelected = useSelector(
    selectMealType
  );


  const caloriesByMealType = useSelector(
    selectCaloriesByMealType
  );


  const isEditingFood = useSelector(
    selectIsEditingFood
  );


  const editingFoodIndex = useSelector(
    selectEditingFoodIndex
  );



  const mealTypes =
    Object.keys(caloriesByMealType);



  const closeModal = () => {

    dispatch(
      addModalSet(false)
    );


    dispatch(
      servingSizeSet(0)
    );


    dispatch(
      stopEditingFood()
    );

  };



  const handleMealClick = (index) => {

    dispatch(
      mealTypeSelectedSet(index)
    );

  };



  const handleAddClick = () => {

    if (isEditingFood) {

      dispatch(
        updateItemFood(
          dataPoints,
          itemFoodSelected,
          mealTypes[mealTypeSelected],
          servingSize,
          editingFoodIndex
        )
      );

    } else {

dispatch(
  addItemFood(
    dataPoints,
    itemFoodSelected,
    mealTypes[mealTypeSelected],
    servingSize
  )
);

    }

  };



  const serving =
    itemFoodSelected?.servings?.[
      itemFoodSelected?.selectedServing ?? 0
    ];



  const multiplier =
    Number(servingSize) || 0;



  const grams =
    serving && multiplier > 0
      ? Math.round(
          serving.metricAmount * multiplier
        )
      : "-";



  const calories =
    serving && multiplier > 0
      ? Math.round(
          serving.calories * multiplier
        )
      : "-";



  if (!addVisible) return null;



  return (

    <ModalPortal>

      <Modal closeModal={closeModal}>


        <Loading loading={loadingAdd} />



        {!loadingAdd &&
          itemFoodSelected &&
          serving && (

          <div className="AddCard">


            <div className="AddCardHeader">

              <img
                className="AddCardImage"
                src={itemFoodSelected.image}
                alt={itemFoodSelected.name}
              />


              <div>

                <h2>
                  {capitalize(itemFoodSelected.name)}
                </h2>


                {itemFoodSelected.brand && (

                  <p>
                    {capitalize(itemFoodSelected.brand)}
                  </p>

                )}

              </div>

            </div>



            <div className="AddCardStats">

              <div>

                <strong>
                  {grams}
                </strong>

                <span>
                  grams
                </span>

              </div>



              <div>

                <strong>
                  {calories}
                </strong>

                <span>
                  calories
                </span>

              </div>


            </div>



            <div className="AddCardServing">

              <InputNumberCustom
                serving_unit={serving.description}
              />

            </div>



            <div className="AddCardMeal">


              <p>
                {isEditingFood
                  ? "Edit food"
                  : "Add to today"}
              </p>



              <div className="MealButtons">


                {mealTypes.map(
                  (type, index) => (

                  <button

                    key={type}

                    className={
                      mealTypeSelected === index
                        ? "MealButton active"
                        : "MealButton"
                    }


                    onClick={() =>
                      handleMealClick(index)
                    }

                  >

                    {capitalize(type)}

                  </button>

                ))}


              </div>


            </div>



            <Button

              className="AddFoodButton"

              onClick={handleAddClick}

              disabled={multiplier <= 0}

            >

              {isEditingFood
                ? "Save Changes"
                : "Add Meal"}

            </Button>


          </div>

        )}


      </Modal>

    </ModalPortal>

  );

}