import React from 'react';
import './ModalAdd.css';

const ModalAdd = (props) => {
    return (
        <div className="ModalAdd">
            <div className="ModalAddContent">
                <div className="ModalAddContainer">
                    {props.children}
                </div>
            </div>
            <button
                onClick={props.closeModal}
                className="AddCardClose" />
            <div className="ModalAddBackdrop"></div>
        </div>
    );
}

export default ModalAdd;