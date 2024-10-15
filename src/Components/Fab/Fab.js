import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actionsGeneral from './../../actions/general';
import './Fab.css';

class Fab extends Component {

    handleAddOnClick = () => {
        document.getElementsByClassName("InputSearchw")[0].focus();
        this.props.dispatch(actionsGeneral.searchModalSet(true, ""));
    }

    render() {
        return (
            <div className="Fab">
                <button className="FabItem FabRotate" tooltip="Add Food" onClick={this.handleAddOnClick}>
                    <FontAwesomeIcon icon="plus" />
                </button>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {}
}

export default connect(mapStateToProps)(Fab);