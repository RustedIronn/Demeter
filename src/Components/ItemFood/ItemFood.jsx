import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import { capitalize, capitalizeAll } from '../../assets/utils/utils';
import './ItemFood.css';

class ItemFood extends Component {
    render() {
        return (
            <div className="ItemFood d-flex bd-highlight mt-3 mb-3 noselect">
                <div className="p-2 bd-highlight">
                    <Image src={this.props.thumb} />
                </div>
                <div className="w-100 d-flex d-flex justify-content-between ItemFoodTexts">
                    <div className="p-2 bd-highlight">
                        <div className="ItemFoodText">
                            {capitalizeAll(this.props.food_name)}
                        </div>
                        <div className="ItemFoodSubtitle">
                            {this.props.serving_size} {this.props.serving_unit}
                            {(this.props.serving_weight_grams) ? ` (${Math.trunc((1 / this.props.serving_qty) * this.props.serving_weight_grams * this.props.serving_size)} g)` : ""}
                        </div>
                    </div>
                    <div className="p-2 bd-highlight">
                        <div className="ItemFoodText text-right">
                            {Math.trunc((1 / this.props.serving_qty) * this.props.nf_calories * this.props.serving_size)} cal
                    </div>
                        <div className="ItemFoodSubtitle">
                            {capitalize(this.props.meal_type)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...state.personal.intakeList[props.index]
    }
}

export default connect(mapStateToProps)(ItemFood);