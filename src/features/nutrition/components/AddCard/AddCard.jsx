import { useDispatch, useSelector } from "react-redux";

import Button from "@/shared/ui/Button/Button";
import ModalPortal from "@/shared/components/Modal/ModalPortal";
import Modal from "@/shared/components/Modal/Modal";
import Loading from "@/shared/components/Loading/Loading";
import ServingInput from "@/features/nutrition/components/ServingInput/ServingInput";
import {
  mealTypeSelectedSet,
  servingSizeSet,
  stopEditingFood,
} from "@/features/nutrition/store/slice";
import { addItemFood, updateItemFood } from "@/features/nutrition/store/thunks";
import {
  selectEditingFoodIndex,
  selectIsEditingFood,
  selectMealType,
  selectSelectedFood,
  selectServingSize,
} from "@/features/nutrition/store/selectors";
import { addModalSet } from "@/app/state/uiSlice";
import { selectAddVisible, selectLoadingAdd } from "@/app/state/selectors";
import { selectDataPoints } from "@/features/profile/store/selectors";
import { selectCaloriesByMealType } from "@/features/goals/store/selectors";
import { capitalize } from "@/shared/utils/utils";

import "./AddCard.css";

export default function AddCard() {
  const dispatch = useDispatch();
  const dataPoints = useSelector(selectDataPoints);
  const addVisible = useSelector(selectAddVisible);
  const loadingAdd = useSelector(selectLoadingAdd);
  const selectedFood = useSelector(selectSelectedFood);
  const servingSize = useSelector(selectServingSize);
  const mealTypeSelected = useSelector(selectMealType);
  const caloriesByMealType = useSelector(selectCaloriesByMealType);
  const isEditingFood = useSelector(selectIsEditingFood);
  const editingFoodIndex = useSelector(selectEditingFoodIndex);
  const mealTypes = Object.keys(caloriesByMealType);
  const serving = selectedFood?.servings?.[selectedFood?.selectedServing ?? 0];
  const multiplier = Number(servingSize) || 0;
  const grams = serving && multiplier > 0
    ? Math.round(serving.metricAmount * multiplier)
    : "-";
  const calories = serving && multiplier > 0
    ? Math.round(serving.calories * multiplier)
    : "-";

  const closeModal = () => {
    dispatch(addModalSet(false));
    dispatch(servingSizeSet(0));
    dispatch(stopEditingFood());
  };

  const handleSubmit = () => {
    if (!selectedFood || multiplier <= 0) return;
    const mealType = mealTypes[mealTypeSelected];

    if (isEditingFood) {
      dispatch(
        updateItemFood(
          dataPoints,
          selectedFood,
          mealType,
          servingSize,
          editingFoodIndex
        )
      );
      return;
    }

    dispatch(addItemFood(dataPoints, selectedFood, mealType, servingSize));
  };

  if (!addVisible) return null;

  return (
    <ModalPortal>
      <Modal closeModal={closeModal}>
        <Loading loading={loadingAdd} />

        {!loadingAdd && selectedFood && serving && (
          <div className="AddCard">
            <div className="AddCardHeader">
              <div className="AddCardImage">
                {selectedFood.image ? (
                  <img src={selectedFood.image} alt={selectedFood.name} />
                ) : (
                  <span>{selectedFood.name?.charAt(0).toUpperCase() ?? "?"}</span>
                )}
              </div>

              <div className="AddCardTitle">
                <h2>{capitalize(selectedFood.name)}</h2>
                {selectedFood.brand && <p>{capitalize(selectedFood.brand)}</p>}
              </div>
            </div>

            <div className="AddCardStats">
              <div className="AddCardStat">
                <strong>{grams}</strong>
                <span>Grams</span>
              </div>
              <div className="AddCardStat">
                <strong>{calories}</strong>
                <span>Calories</span>
              </div>
            </div>

            <ServingInput serving_unit={serving.description} />

            <div className="AddCardMeal">
              <span className="AddCardLabel">
                {isEditingFood ? "Move to meal" : "Add to meal"}
              </span>
              <div className="MealButtons">
                {mealTypes.map((type, index) => (
                  <Button
                    key={type}
                    variant={mealTypeSelected === index ? "primary" : "secondary"}
                    size="sm"
                    className="MealButton"
                    onClick={() => dispatch(mealTypeSelectedSet(index))}
                  >
                    {capitalize(type)}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="AddFoodButton"
              onClick={handleSubmit}
              disabled={multiplier <= 0}
            >
              {isEditingFood ? "Save Changes" : "Add Food"}
            </Button>
          </div>
        )}
      </Modal>
    </ModalPortal>
  );
}
