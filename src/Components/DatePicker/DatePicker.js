import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import * as actions from './../../actions/general';
import './DatePicker.css';

let today = new Date();
let yesterday = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 1));
let beforeYesterday = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 2));
let isToday = false;
let isYesterday = false;
let isBeforeYesterday = false;

class DatePicker extends Component {
    handleNextOnClick = () => {
        let newDateSelected = new Date(this.props.dateSelected.getFullYear(), this.props.dateSelected.getMonth(), (this.props.dateSelected.getDate() + 1))
        this.props.dispatch(actions.DateSet(newDateSelected, this.props.dataPoints));
    }

    handleBackOnClick = () => {
        let newDateSelected = new Date(this.props.dateSelected.getFullYear(), this.props.dateSelected.getMonth(), (this.props.dateSelected.getDate() - 1))
        this.props.dispatch(actions.DateSet(newDateSelected, this.props.dataPoints))
    }

    render() {

        if (this.props.dateSelected !== undefined) {
            isToday = today.toLocaleDateString().substring(0, 10) === this.props.dateSelected.toLocaleDateString().substring(0, 10);
            isYesterday = yesterday.toLocaleDateString().substring(0, 10) === this.props.dateSelected.toLocaleDateString().substring(0, 10);
            isBeforeYesterday = beforeYesterday.toLocaleDateString().substring(0, 10) === this.props.dateSelected.toLocaleDateString().substring(0, 10);
        }

        return (
            <div className={(this.props.isMobile ? "DatePickerMobile" : "DatePicker") + " d-flex justify-content-between pl-4 pr-4"}>
                <div
                    className={(isBeforeYesterday ? "DatePickerIconDisabled " : "") + "align-self-center text-left DatePickerIcon"}
                    onClick={(isBeforeYesterday) ? null : this.handleBackOnClick}
                >
                    <FontAwesomeIcon icon="chevron-left" />
                </div>
                <div className="DatePickerText noselect">
                    {
                        isToday &&
                        "Today"
                    }
                    {
                        isYesterday &&
                        "Yesterday"
                    }
                    {
                        (!isToday && !isYesterday) &&
                        <Moment format="DD MMM" withTitle>
                            {this.props.dateSelected}
                        </Moment>
                    }
                </div>
                <div
                    className={(isToday ? "DatePickerIconDisabled " : "") + "align-self-center text-right DatePickerIcon"}
                    onClick={(isToday) ? null : this.handleNextOnClick}
                >
                    <FontAwesomeIcon icon="chevron-right" />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isMobile: state.general.isMobile,
        dateSelected: state.general.dateSelected,
        dataPoints: state.personal.data_points
    }
}

export default connect(mapStateToProps)(DatePicker);