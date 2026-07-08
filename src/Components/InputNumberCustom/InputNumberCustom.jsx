import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputNumber from 'rc-input-number';
import * as actionsGeneral from './../../actions/general';
import 'rc-input-number/assets/index.css';
import './InputNumberCustom.css';

class InputNumberCustom extends Component {

    onChange = (e) => this.props.dispatch(actionsGeneral.servingSizeSet(e))

    onClick = () => {
        let SearchInput = document.getElementsByClassName("SearchInput");
        let SearchInputMobile = document.getElementsByClassName("SearchInputMobile");
        let input = document.getElementsByClassName("rc-input-number-input");

        if (SearchInput.length > 0) SearchInput[0].focus();
        if (SearchInputMobile.length > 0) SearchInputMobile[0].focus();
        if (input.length > 0) input[0].focus();
    }

    setRef = element => this.inputServings = element;

    render() {
        const upHandler = (
            <div style={{ color: '#6a6a6a' }} onClick={this.onClick}>
                <FontAwesomeIcon icon="chevron-up" />
            </div>);
        const downHandler = (<div style={{ color: '#6a6a6a' }}>
            <FontAwesomeIcon icon="chevron-down" />
        </div>);

        return (
            <div className="InputNumberCustom noselect">
                <span className="InputNumberCustomTitle">Servings</span>
                <div style={{ margin: 0 }}>
                    <InputNumber
                        className="form-control"
                        min={0}
                        style={{ width: 110 }}
                        value={this.props.servingSize}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        onKeyPress={this.onKeyPress}
                        onClick={this.onClick}
                        step={0.1}
                        upHandler={upHandler}
                        downHandler={downHandler}
                    />
                </div>
                <span className="InputNumberCustomSubtitle">{this.props.serving_unit}</span>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        servingSize: state.general.servingSize
    }
}

export default connect(mapStateToProps)(InputNumberCustom);