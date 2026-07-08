import React from 'react';
import './ModalSearch.css';

const ModalSearch = (props) => {
    return (
        <div className="ModalSearch">
            <div className={"ModalSearchContainer " + ((props.loading || props.length === 0) ? "" : "h-100")}>
                <div className={"ModalSearchContent " + ((props.loading || props.length === 0) ? "" : "h-100")}>
                    <div style={{ overflowY: "auto", height: "100%" }}>
                        {props.children}
                    </div>
                </div>
            </div>
            <div className="ModalSearchBackdrop" onClick={props.closeModal}></div>
        </div>
    );
}

export default ModalSearch;
