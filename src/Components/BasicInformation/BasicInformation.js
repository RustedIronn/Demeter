import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Button, Form } from 'react-bootstrap';
import CircleData from './../CircleData/CircleData';
import ImageProfile from './../../assets/image/profile.png';
import './BasicInformationSM.css';

class BasicInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            firstName: this.props.personal.first_name,
            lastName: this.props.personal.last_name,
            weight: this.props.personal.weight_kg,
            height: this.props.personal.height_cm,
            profilePhoto: ImageProfile, // Default profile photo
            selectedFile: null // To hold the selected file
        };
    }

    handleEditToggle = () => {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing
        }));
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ profilePhoto: reader.result, selectedFile: file });
            };
            reader.readAsDataURL(file); // Convert file to Base64 string for preview
        }
    };

    handleSave = () => {
        // Dispatch an action to update personal information
        // For example: this.props.updatePersonalInfo({ 
        //   firstName: this.state.firstName,
        //   lastName: this.state.lastName,
        //   weight: this.state.weight,
        //   height: this.state.height,
        //   profilePhoto: this.state.profilePhoto
        // });
        this.handleEditToggle(); // Toggle back to view mode after saving
    };

    render() {
        return (
            <React.Fragment>
                <div className="BasicInformation noselect">
                    <div className="d-flex bd-highlight">
                        <div className="p-2 flex-fill bd-highlight d-flex flex-column justify-content-center">
                            {this.state.isEditing ? (
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="number" 
                                        name="weight" 
                                        value={this.state.weight} 
                                        onChange={this.handleChange} 
                                        placeholder="Weight (kg)"
                                        className="custom-input"
                                    />
                                    <Form.Label className="text-muted">Weight (kg)</Form.Label>
                                </Form.Group>
                            ) : (
                                <CircleData number={this.state.weight} unit="kg" />
                            )}
                        </div>
                        <div className="p-2 flex-fill bd-highlight text-center">
                            <Image src={this.state.profilePhoto} roundedCircle className="profile-img"/>
                        </div>
                        <div className="p-2 flex-fill bd-highlight d-flex flex-column justify-content-center">
                            {this.state.isEditing ? (
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="number" 
                                        name="height" 
                                        value={this.state.height} 
                                        onChange={this.handleChange} 
                                        placeholder="Height (cm)"
                                        className="custom-input"
                                    />
                                    <Form.Label className="text-muted">Height (cm)</Form.Label>
                                </Form.Group>
                            ) : (
                                <CircleData number={this.state.height} unit="cm" />
                            )}
                        </div>
                    </div>
                    <div className="PersonalPanelName">
                        {this.state.isEditing ? (
                            <div className="d-flex flex-column">
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="firstName" 
                                        value={this.state.firstName} 
                                        onChange={this.handleChange} 
                                        className="custom-input"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="lastName" 
                                        value={this.state.lastName} 
                                        onChange={this.handleChange} 
                                        className="custom-input"
                                    />
                                </Form.Group>
                            </div>
                        ) : (
                            `${this.state.firstName} ${this.state.lastName}`
                        )}
                    </div>
                    {this.state.isEditing && (
                        <div className="mt-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Profile Photo:</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={this.handleFileChange} 
                                />
                            </Form.Group>
                        </div>
                    )}
                    <div className="d-flex justify-content-center mt-3">
                    <Button 
    onClick={this.handleEditToggle} 
    variant={this.state.isEditing ? 'secondary' : 'primary'}
    className={`mr-2 ${this.state.isEditing ? 'CancelButton' : ''}`}
>
    {this.state.isEditing ? 'Cancel' : 'Edit'}
</Button>
{this.state.isEditing && (
    <Button 
        onClick={this.handleSave} 
        variant="success" 
        className="SaveButton"
    >
        Save
    </Button>
)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isMobile: state.general.isMobile,
        personal: state.personal
    };
}

// Uncomment this when you implement updatePersonalInfo action
// const mapDispatchToProps = { updatePersonalInfo };

export default connect(mapStateToProps)(BasicInformation);
