import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Button, Form } from "react-bootstrap";

import CircleData from "../CircleData/CircleData";
import ImageProfile from "../../assets/image/profile.png";
import { updatePersonalData } from "../../store/personal/thunks";

import "./BasicInformationSM.css";

export default function BasicInformation() {
  const dispatch = useDispatch();

  const personal = useSelector((state) => state.personal);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(personal.first_name);
  const [lastName, setLastName] = useState(personal.last_name);
  const [weight, setWeight] = useState(personal.weight_kg);
  const [height, setHeight] = useState(personal.height_cm);
  const [profilePhoto, setProfilePhoto] = useState(ImageProfile);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "height":
        setHeight(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result);
      setSelectedFile(file);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    dispatch(
      updatePersonalData({
        first_name: firstName,
        last_name: lastName,
        weight_kg: Number(weight),
        height_cm: Number(height),
      })
    );

    setIsEditing(false);
  };

  return (
    <div className="BasicInformation noselect">
      <div className="d-flex bd-highlight">
        <div className="p-2 flex-fill bd-highlight d-flex flex-column justify-content-center">
          {isEditing ? (
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="weight"
                value={weight}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="custom-input"
              />
              <Form.Label className="text-muted">
                Weight (kg)
              </Form.Label>
            </Form.Group>
          ) : (
            <CircleData number={weight} unit="kg" />
          )}
        </div>

        <div className="p-2 flex-fill bd-highlight text-center">
          <Image
            src={profilePhoto}
            roundedCircle
            className="profile-img"
          />
        </div>

        <div className="p-2 flex-fill bd-highlight d-flex flex-column justify-content-center">
          {isEditing ? (
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="height"
                value={height}
                onChange={handleChange}
                placeholder="Height (cm)"
                className="custom-input"
              />
              <Form.Label className="text-muted">
                Height (cm)
              </Form.Label>
            </Form.Group>
          ) : (
            <CircleData number={height} unit="cm" />
          )}
        </div>
      </div>

      <div className="PersonalPanelName">
        {isEditing ? (
          <div className="d-flex flex-column">
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>

              <Form.Control
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                className="custom-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>

              <Form.Control
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className="custom-input"
              />
            </Form.Group>
          </div>
        ) : (
          `${firstName} ${lastName}`
        )}
      </div>

      {isEditing && (
        <div className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Profile Photo:</Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
        </div>
      )}

      <div className="d-flex justify-content-center mt-3">
        <Button
          onClick={handleEditToggle}
          variant={isEditing ? "secondary" : "primary"}
          className={`mr-2 ${
            isEditing ? "CancelButton" : ""
          }`}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>

        {isEditing && (
          <Button
            onClick={handleSave}
            variant="success"
            className="SaveButton"
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}