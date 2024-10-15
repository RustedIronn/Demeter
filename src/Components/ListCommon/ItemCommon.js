import React from 'react';
import { Image } from 'react-bootstrap';
import { capitalizeAll } from '../../assets/utils/utils';
import './itemCommon.css';

const ItemCommon = (props) => {
    return (
        <div className="ItemCommon d-flex bd-highlight mt-1 mb-1" onClick={() => props.handleAddOnClick(props)}>
            <div className="p-2 bd-highlight ItemCommonPhoto">
                <Image src={props.photo.thumb} />
            </div>
            <div className="w-100 d-flex d-flex justify-content-between ItemCommonTexts">
                <div className="d-flex align-items-center">
                    <div className="ItemCommonText">
                        {capitalizeAll(props.food_name)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCommon;