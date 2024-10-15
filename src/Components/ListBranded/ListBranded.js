import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemBranded from './ItemBranded';
import * as actionsGeneral from './../../actions/general';
import './ListBranded.css';

class ListBranded extends Component {

    handleAddOnClick = (item) => this.props.dispatch(actionsGeneral.itemFoodSelectedByIdSet(item.nix_item_id));

    render() {
        return (
            <div className="ListBranded">
                <div className="ListBrandedTitle">Branded</div>
                {
                    this.props.branded.map((item, key) => {
                        if (key <= 4)
                            return <ItemBranded key={key} {...item} handleAddOnClick={this.handleAddOnClick} />
                        else
                            return null;
                    })
                }
                {
                    (this.props.searchText.length === 0) ?
                        <div className="ListBrandedNoElement noselect">
                            Please input your search
                    </div> : (this.props.branded.length === 0) ?
                            <div className="ListBrandedNoElement noselect">
                                No items found.
                    </div> : null
                }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        branded: state.general.branded,
        searchText: state.general.searchText
    }
}

export default connect(mapStateToProps)(ListBranded);