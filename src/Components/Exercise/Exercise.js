import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, ListGroup } from 'react-bootstrap';
import './Exercise.css';

class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutSuggestions: [],
        };
    }

    setWorkoutSuggestions = (caloriesBurned) => {
        let suggestions = [];

        if (caloriesBurned < 100) {
            suggestions = ['No additional exercise needed, you have burned a small amount of calories.'];
        } else if (caloriesBurned >= 100 && caloriesBurned < 500) {
            suggestions = ['You can go for a walk or do light stretching exercises.'];
        } else if (caloriesBurned >= 500 && caloriesBurned < 1500) {
            suggestions = ['Consider doing a moderate workout like cycling or brisk walking.'];
        } else if (caloriesBurned >= 1500) {
            suggestions = ['Go for a high-intensity workout like interval training or swimming to burn even more calories.'];
        }

        this.setState({ workoutSuggestions: suggestions });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.caloriesBurned !== this.props.caloriesBurned) {
            this.setWorkoutSuggestions(this.props.caloriesBurned);
        }
    }

    render() {
        const { caloriesBurned } = this.props;
        const { workoutSuggestions } = this.state;

        return (
            <div className="Exercise noselect">
                <h3>Exercise Tracker</h3>

                {caloriesBurned > 0 && (
                    <Alert variant="info">
                        You will burn <strong>{caloriesBurned} calories</strong> from the following exercise.
                    </Alert>
                )}

                {workoutSuggestions.length > 0 && (
                    <div>
                        <h4>Suggested Workouts:</h4>
                        <ListGroup>
                            {workoutSuggestions.map((suggestion, index) => (
                                <ListGroup.Item key={index}>{suggestion}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // Any data you might want to pull from Redux (optional)
    };
}

export default connect(mapStateToProps)(Exercise);
