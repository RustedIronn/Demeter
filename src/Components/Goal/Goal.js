import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import CardGold from './CardGoal';
import GoalData from './GoalData';
import './Goal.css';
import { capitalize } from './../../assets/utils/utils';

class Goal extends Component {
    render() {
        let percentage = Math.round(this.props.caloriesConsumed * 100 / this.props.personal.daily_goal);
        if (this.props.caloriesConsumed === 0 && this.props.personal.daily_goal === 0) percentage = 0;

        return (
            <div className="Goal noselect">
                <div className="d-flex justify-content-between">
                    <CardGold
                        isMobile={this.props.isMobile}
                        calories={this.props.caloriesConsumed}
                        subtitle="consumed"
                        align="left"
                    />
                    <CardGold
                        isMobile={this.props.isMobile}
                        calories={this.props.personal.daily_goal}
                        subtitle="daily goal"
                        align="right"
                    />
                </div>
                <div className="mb-3">
                    <ProgressBar now={percentage} label={`${percentage}%`} srOnly />
                    <div
                        className="GoalPercentage"
                        style={{ paddingLeft: ((percentage > 100 ? 100 : percentage) - 5) + '%' }}
                    >
                        {
                            `${percentage}%`
                        }
                    </div>

                </div>
                <div className="d-flex justify-content-between">
                    {
                        Object.keys(this.props.caloriesByMealType).map((key, i) => {
                            return <GoalData key={i} isMobile={this.props.isMobile} text={capitalize(key)} number={this.props.caloriesByMealType[key]} />
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isMobile: state.general.isMobile,
        personal: state.personal,
        caloriesConsumed: state.calculatedInformation.caloriesConsumed,
        caloriesByMealType: state.calculatedInformation.caloriesByMealType
    }
}

export default connect(mapStateToProps)(Goal);