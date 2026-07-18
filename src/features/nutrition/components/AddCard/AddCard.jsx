import { useDispatch, useSelector } from "react-redux";
import Button from "@/shared/ui/Button/Button";
import {
  ChevronDown,
} from "lucide-react";

import {
  addModalSet,
  servingSizeSet,
  mealTypeSelectedSet,
  stopEditingFood,
} from "@/features/nutrition/store/slice";

import {
  addItemFood,
  updateItemFood,
} from "@/features/profile/store/thunks";

import ModalPortal from "@/shared/components/ModalAdd/ModalPortal";
import ModalAdd from "@/shared/components/ModalAdd/ModalAdd";
import Loading from "@/shared/components/Loading/Loading";
import InputNumberCustom from "@/shared/components/InputNumberCustom/InputNumberCustom";
import { capitalize } from "@/shared/utils/utils";

import "./AddCard.css";

export default function AddCard() {
  const dispatch = useDispatch();

  const dataPoints = useSelector((state) => state.personal.data_points);
  const addVisible = useSelector((state) => state.general.addVisible);
  const loadingAdd = useSelector((state) => state.general.loadingAdd);
  const itemFoodSelected = useSelector(
    (state) => state.general.itemFoodSelected
  );
  const servingSize = useSelector((state) => state.general.servingSize);
  const mealTypeSelected = useSelector(
    (state) => state.general.mealTypeSelected
  );
  const caloriesByMealType = useSelector(
    (state) => state.calculatedInformation.caloriesByMealType
  );
  const isEditingFood = useSelector(
  (state) => state.general.isEditingFood
);

const editingFoodIndex = useSelector(
  (state) => state.general.editingFoodIndex
);

  const mealTypes = Object.keys(caloriesByMealType);

 const closeModalAdd = () => {
  dispatch(addModalSet(false));
  dispatch(servingSizeSet(0));
  dispatch(stopEditingFood());
};

  const handleMealClick = (index) => {
    dispatch(mealTypeSelectedSet(index));
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

  const multiplier = Number(servingSize);

  const grams =
    serving && multiplier > 0
      ? Math.round(serving.metricAmount * multiplier)
      : "-";

  const calories =
    serving && multiplier > 0
      ? Math.round(serving.calories * multiplier)
      : "-";

  if (!addVisible) return null;

  return (
    <ModalPortal>
<ModalAdd closeModal={closeModalAdd}>

  <Loading loading={loadingAdd} />


  {!loadingAdd && itemFoodSelected && serving && (

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

          {mealTypes.map((type, index) => (

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
        {isEditingFood ? "Save Changes" : "Add Meal"}
      </Button>


    </div>

  )}

</ModalAdd>
    </ModalPortal>
  );
}