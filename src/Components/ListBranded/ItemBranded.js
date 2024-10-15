import React from 'react';
import { Image } from 'react-bootstrap';
import { capitalizeAll } from '../../assets/utils/utils';
import './ItemBranded.css';

const ItemBranded = (props) => {
    return (
        <div className="ItemBranded d-flex bd-highlight mt-1 mb-1" onClick={() => props.handleAddOnClick(props)}>
            <div className="p-2 bd-highlight ItemBrandedPhoto">
                <Image src={props.photo.thumb} />
            </div>
            <div className="w-100 d-flex d-flex justify-content-between ItemBrandedTexts">
                <div className="d-flex flex-column bd-highlight mb-3">
                    <div className="ItemBrandedText mt-2">{capitalizeAll(props.food_name)}</div>
                    <div className="ItemBrandedSubtitle">{capitalizeAll(props.brand_name)}</div>
                </div>
            </div>
        </div>
    );
}

export default ItemBranded;