import React from 'react';
import './GoalData.css';

const GoalData = (props) => {
    return (
        <div className={props.isMobile ? "GoalDataMobile" : "GoalData"}>
            <div className="GoalDataNumber">{props.number}</div>
            <div className="GoalDataText">{props.text}</div>
        </div>
    );
}

export default GoalData;