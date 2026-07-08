import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalSearchContainer from './../ModalSearch/ModalSearchContainer';
import ModalSearch from './../ModalSearch/ModalSearch';
import Loading from './../Loading/Loading';
import SearchResultsModal from "./../Search/SearchResultsModal";
import * as actionsGeneral from './../../actions/general';

class SearchCard extends Component {

    closeModalSearch = () => this.props.dispatch(actionsGeneral.searchModalSet(false))

    render() {
        return (
            <React.Fragment>
                {
                    this.props.searchVisible &&
                    <ModalSearchContainer>
                        <ModalSearch length={this.props.length} closeModal={this.closeModalSearch} loading={this.props.loadingSearch}>
                            <Loading loading={this.props.loadingSearch} />
                            {
                                !this.props.loadingSearch &&
                                <SearchResultsModal />
                            }
                        </ModalSearch>
                    </ModalSearchContainer>
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        searchVisible: state.general.searchVisible,
        loadingSearch: state.general.loadingSearch,
        length: state.general.common.length
    }
}

export default connect(mapStateToProps)(SearchCard);