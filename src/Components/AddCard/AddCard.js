import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Button, Dropdown } from 'react-bootstrap';
import ModalAddContainer from './../ModalAdd/ModalAddContainer';
import ModalAdd from './../ModalAdd/ModalAdd';
import Loading from './../Loading/Loading';
import CustomToggle from './CustomToggle';
import InputNumberCustom from './../InputNumberCustom/InputNumberCustom';
import * as actionsGeneral from './../../actions/general';
import * as actionsPersonalData from './../../actions/personalData';
import { capitalize } from './../../assets/utils/utils';
import './AddCard.css';

class AddCard extends Component {

    closeModalAdd = () => {
        this.props.dispatch(actionsGeneral.addModalSet(false));
        this.props.dispatch(actionsGeneral.servingSizeSet(0));
    }

    handleOnclick = (index) => this.props.dispatch(actionsGeneral.mealTypeSelectedSet(index));

    handleAddOnclick = () => this.props.dispatch(actionsPersonalData.AddItemFoodSet(this.props.dataPoints, this.props.itemFoodSelected, Object.keys(this.props.caloriesByMealType)[this.props.mealTypeSelected], this.props.servingSize));

    render() {
        let grams = null;
        if (this.props.itemFoodSelected != null)
            grams = parseInt((1 / this.props.itemFoodSelected.serving_qty) * this.props.itemFoodSelected.serving_weight_grams * this.props.servingSize);
        if (!Number.isInteger(grams)) grams = "-";

        let calories = null;
        if (this.props.itemFoodSelected != null)
            calories = parseInt((1 / this.props.itemFoodSelected.serving_qty) * this.props.itemFoodSelected.nf_calories * this.props.servingSize);
        if (!Number.isInteger(calories)) calories = "-";

        return (
            <React.Fragment>
                {
                    this.props.addVisible &&
                    <ModalAddContainer>
                        <ModalAdd closeModal={this.closeModalAdd}>
                            <Loading loading={this.props.loadingAdd} />
                            {
                                !this.props.loadingAdd &&
                                <div className="AddCard">
                                    <div className="AddCardHeader d-flex justify-content-between">
                                        <div>
                                            <Image
                                                className="AddCardImage"
                                                src={this.props.itemFoodSelected.photo.thumb}
                                            />
                                            <div className="AddCardTitle">{capitalize(this.props.itemFoodSelected.food_name)}</div>
                                            <div className="AddCardSubtitle">{(this.props.itemFoodSelected.brand_name) ? capitalize(this.props.itemFoodSelected.brand_name) : null}</div>
                                        </div>
                                    </div>
                                    <div className="AddCardBody d-flex justify-content-between">
                                        <div>
                                            <InputNumberCustom
                                                serving_qty={this.props.itemFoodSelected.serving_qty}
                                                serving_unit={this.props.itemFoodSelected.serving_unit}
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
                                        <div className="AddCardTitleSelec">Add to today</div>
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                    {capitalize(Object.keys(this.props.caloriesByMealType)[this.props.mealTypeSelected])}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {
                                                        Object.keys(this.props.caloriesByMealType).map((key, i) => {
                                                            return <Dropdown.Item key={i} as="button" onClick={() => this.handleOnclick(i)}>{capitalize(key)}</Dropdown.Item>
                                                        })
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="text-right mt-3">
                                            <Button variant="primary" size="lg" onClick={this.handleAddOnclick} disabled={(this.props.servingSize === 0 || this.props.servingSize === "0.00")}>ADD</Button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </ModalAdd>
                    </ModalAddContainer>
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        dataPoints: state.personal.data_points,
        addVisible: state.general.addVisible,
        loadingAdd: state.general.loadingAdd,
        itemFoodSelected: state.general.itemFoodSelected,
        servingSize: state.general.servingSize,
        mealTypeSelected: state.general.mealTypeSelected,
        caloriesByMealType: state.calculatedInformation.caloriesByMealType
    }
}

export default connect(mapStateToProps)(AddCard);