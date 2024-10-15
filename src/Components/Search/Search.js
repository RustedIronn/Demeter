import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import InputSearch from './InputSearch';
import DatePicker from '../DatePicker/DatePicker';
import './Search.css';

class Search extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.isMobile &&
                    <div className="Search">
                        <div className="d-flex flex-nowrap justify-content-center">
                            <div className="w-100 p-3">
                                <InputSearch />
                            </div>
                        </div>
                    </div>
                }
                {
                    !this.props.isMobile &&
                    <Container className="Search" fluid>
                        <Row className="justify-content-md-center">
                            <Col md="6">
                                <InputSearch />
                                <DatePicker />
                            </Col>
                        </Row>
                    </Container>
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isMobile: state.general.isMobile
    }
}

export default connect(mapStateToProps)(Search);