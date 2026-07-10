import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import { capitalize, capitalizeAll } from '../../assets/utils/utils';
import './ItemFood.css';

class ItemFood extends Component {
    render() {
  const {
    image,
    name,
    serving,
    serving_size,
    meal_type,
  } = this.props;

  return (
    <div className="ItemFood d-flex bd-highlight mt-3 mb-3 noselect">
      <div className="p-2 bd-highlight">
        <Image src={image} />
      </div>

      <div className="w-100 d-flex justify-content-between ItemFoodTexts">
        <div className="p-2 bd-highlight">
          <div className="ItemFoodText">
            {capitalizeAll(name)}
          </div>

          <div className="ItemFoodSubtitle">
            {serving_size} {serving.servingUnit}
            {serving.metricAmount
              ? ` (${Math.round(
                  serving.metricAmount * serving_size
                )} ${serving.metricUnit})`
              : ""}
          </div>
        </div>

        <div className="p-2 bd-highlight">
          <div className="ItemFoodText text-right">
            {Math.round(serving.calories * serving_size)} cal
          </div>

          <div className="ItemFoodSubtitle">
            {capitalize(meal_type)}
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