import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemCommon from './ItemCommon';
import './ListCommon.css';
import * as actionsGeneral from './../../actions/general';

class ListCommon extends Component {

    handleAddOnClick = (item) => {
        this.props.dispatch(actionsGeneral.itemFoodSelectedSet(item.serving_qty, item.serving_unit, item.food_name));
    }

    render() {
        return (
            <div className="ListCommon">
                <div className="ListCommonTitle">Common</div>
                {
                    this.props.common.map((item, key) => {
                        if (key <= 4)
                            return <ItemCommon key={key} {...item} handleAddOnClick={this.handleAddOnClick} />
                        else
                            return null;
                    })
                }
                {
                    (this.props.searchText.length === 0) ?
                        <div className="ListCommonNoElement noselect">
                            Please input your search
                    </div> : (this.props.common.length === 0) ?
                            <div className="ListCommonNoElement noselect">
                                No items found.
                    </div> : null
                }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        common: state.general.common,
        searchText: state.general.searchText
    }
}

export default connect(mapStateToProps)(ListCommon);