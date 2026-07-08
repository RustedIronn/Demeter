import React from 'react';
import { createPortal } from 'react-dom';

class ModalAddContainer extends React.Component {
    render() {
        return createPortal(this.props.children, document.getElementById("modal-add-container"));
    }
}

export default ModalAddContainer;