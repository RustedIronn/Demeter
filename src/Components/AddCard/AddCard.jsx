import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Button, Dropdown } from "react-bootstrap";

import {
  addModalSet,
  servingSizeSet,
  mealTypeSelectedSet,
} from "../../store/general/slice";

import ModalAddContainer from "./../ModalAdd/ModalAddContainer";
import ModalAdd from "./../ModalAdd/ModalAdd";
import Loading from "./../Loading/Loading";
import CustomToggle from "./CustomToggle";
import InputNumberCustom from "./../InputNumberCustom/InputNumberCustom";

import { addItemFood } from "../../store/personal/thunks";
import { capitalize } from "../../assets/utils/utils";

import "./AddCard.css";

class AddCard extends Component {
  closeModalAdd = () => {
  this.props.dispatch(addModalSet(false));
  this.props.dispatch(servingSizeSet(0));
};

  handleMealClick = (index) =>
  this.props.dispatch(mealTypeSelectedSet(index));

  handleAddClick = () => {

  this.props.dispatch(
    addItemFood(
      this.props.dataPoints,
      this.props.itemFoodSelected,
      Object.keys(this.props.caloriesByMealType)[
        this.props.mealTypeSelected
      ],
      this.props.servingSize
    )
  );
};

  render() {
    const { itemFoodSelected } = this.props;

    const serving =
      itemFoodSelected?.servings?.[
        itemFoodSelected?.selectedServing ?? 0
      ];

    const multiplier = Number(this.props.servingSize);

    const grams =
      serving && multiplier > 0
        ? Math.round(serving.metricAmount * multiplier)
        : "-";

    const calories =
      serving && multiplier > 0
        ? Math.round(serving.calories * multiplier)
        : "-";

    return (
      <>
        {this.props.addVisible && (
          <ModalAddContainer>
            <ModalAdd closeModal={this.closeModalAdd}>
              <Loading loading={this.props.loadingAdd} />

              {!this.props.loadingAdd &&
                itemFoodSelected &&
                serving && (
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
                          {capitalize(
                            Object.keys(this.props.caloriesByMealType)[
                              this.props.mealTypeSelected
                            ]
                          )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {Object.keys(this.props.caloriesByMealType).map(
                            (key, index) => (
                              <Dropdown.Item
                                key={index}
                                as="button"
                                onClick={() =>
                                  this.handleMealClick(index)
                                }
                              >
                                {capitalize(key)}
                              </Dropdown.Item>
                            )
                          )}
                        </Dropdown.Menu>
                      </Dropdown>

                      <div className="text-right mt-3">
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={this.handleAddClick}
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
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    dataPoints: state.personal.data_points,
    addVisible: state.general.addVisible,
    loadingAdd: state.general.loadingAdd,
    itemFoodSelected: state.general.itemFoodSelected,
    servingSize: state.general.servingSize,
    mealTypeSelected: state.general.mealTypeSelected,
    caloriesByMealType: state.calculatedInformation.caloriesByMealType,
  };
}

export default connect(mapStateToProps)(AddCard);