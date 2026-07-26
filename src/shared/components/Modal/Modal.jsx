import React from 'react';
import './Modal.css';

const Modal = (props) => {
    return (
        <div className="Modal">
            <div className="ModalContent">
                <div className="ModalPortal">
                    {props.children}
                </div>
            </div>
            <button
  onClick={props.closeModal}
  className="AddCardClose"
  aria-label="Close modal"
/>
            <div className="ModalBackdrop"></div>
        </div>
    );
}

export default Modal;