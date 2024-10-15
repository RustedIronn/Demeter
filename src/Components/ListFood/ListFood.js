import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import ItemFood from './../ItemFood/ItemFood';
import './ListFood.css';

class ListFood extends Component {
    render() {
        const { intakeList, dateSelected } = this.props;
        const today = new Date();
        const isToday = today.toLocaleDateString().substring(0, 10) === dateSelected.toLocaleDateString().substring(0, 10);
        
        return (
            <Col md="7" className="ListFood pr-0">
                {intakeList.map((item, key) => (
                    <div className="ItemFood" key={key}>
                        <ItemFood index={key} />
                    </div>
                ))}
                {intakeList.length === 0 && (
                    <div className="ListFoodNoElement noselect">
                        No food item added{isToday ? ' yet' : ''}.
                    </div>
                )}
            </Col>
        );
    }
}

const mapStateToProps = (state) => ({
    intakeList: state.personal.intakeList,
    dateSelected: state.general.dateSelected,
});

export default connect(mapStateToProps)(ListFood);
