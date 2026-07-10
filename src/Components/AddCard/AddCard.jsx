import { useDispatch, useSelector } from "react-redux";
import { Image, Button, Dropdown } from "react-bootstrap";

import {
  addModalSet,
  servingSizeSet,
  mealTypeSelectedSet,
} from "../../store/general/slice";

import ModalAddContainer from "../ModalAdd/ModalAddContainer";
import ModalAdd from "../ModalAdd/ModalAdd";
import Loading from "../Loading/Loading";
import CustomToggle from "./CustomToggle";
import InputNumberCustom from "../InputNumberCustom/InputNumberCustom";

import { addItemFood } from "../../store/personal/thunks";
import { capitalize } from "../../assets/utils/utils";

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

  const mealTypes = Object.keys(caloriesByMealType);

  const closeModalAdd = () => {
    dispatch(addModalSet(false));
    dispatch(servingSizeSet(0));
  };

  const handleMealClick = (index) => {
    dispatch(mealTypeSelectedSet(index));
  };

  const handleAddClick = () => {
    dispatch(
      addItemFood(
        dataPoints,
        itemFoodSelected,
        mealTypes[mealTypeSelected],
        servingSize
      )
    );
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
    <ModalAddContainer>
      <ModalAdd closeModal={closeModalAdd}>
        <Loading loading={loadingAdd} />

        {!loadingAdd && itemFoodSelected && serving && (
          <div className="AddCard">
            <div className="AddCardHeader d-flex justify-content-between">
              <div>
                <Image
                  className="AddCardImage"
                  src={itemFoodSelected.image}
                />

                <div className="AddCardTitle">
                  {capitalize(itemFoodSelected.name)}
                </div>

                <div className="AddCardSubtitle">
                  {itemFoodSelected.brand
                    ? capitalize(itemFoodSelected.brand)
                    : null}
                </div>
              </div>
            </div>

            <div className="AddCardBody d-flex justify-content-between">
              <div>
                <InputNumberCustom
                  serving_unit={serving.description}
                />
              </div>

              <div>
                <div className="AddCardNumber">{grams}</div>
                <div className="AddCardDetail">grams</div>
              </div>

              <div>
                <div className="AddCardNumber">{calories}</div>
                <div className="AddCardDetail">calories</div>
              </div>
            </div>

            <div className="AddCardFooter">
              <div className="AddCardTitleSelec">
                Add to today
              </div>

              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  {capitalize(mealTypes[mealTypeSelected])}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {mealTypes.map((key, index) => (
                    <Dropdown.Item
                      key={index}
                      as="button"
                      onClick={() => handleMealClick(index)}
                    >
                      {capitalize(key)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <div className="text-right mt-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddClick}
                  disabled={multiplier <= 0}
                >
                  ADD
                </Button>
              </div>
            </div>
          </div>
        )}
      </ModalAdd>
    </ModalAddContainer>
  );
}