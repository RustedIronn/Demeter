import React from 'react';
import './CardGoal.css';

const CardGoal = (props) => {
    return (
        <div className={props.isMobile ? "CardGoldMobile" : "CardGold"}>
            <div className={"CardGoldCalories text-" + props.align}>
                {props.calories + " cal"}
            </div>
            <div className={"CardGoldSubtitle text-" + props.align}>{props.subtitle}</div>
        </div>
    );
}

export default CardGoal;