import React from 'react';
import './CircleData.css';

const CircleData = (props) => {
    return (
        <div className={"rounded-circle " + ((props.mobile) ? "CircleDataMobile" : "CircleData")}>
            <div className="CircleDataText">{props.number}</div>
            <div className="CircleDataUnit">{props.unit}</div>
        </div>
    );
}

export default CircleData;