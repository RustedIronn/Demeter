import React from 'react';
import { createPortal } from 'react-dom';

class ModalSearchContainer extends React.Component {
    render() {
        return createPortal(this.props.children, document.getElementById("modal-search-container"));
    }
}

export default ModalSearchContainer;