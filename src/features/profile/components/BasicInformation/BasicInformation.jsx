import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pencil,
  Save,
  X,
} from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";

import CircleData from "@/features/dashboard/components/CircleData/CircleData";

import ImageProfile from "@/assets/images/profile.png";

import {
  updatePersonalData,
} from "@/features/profile/store/thunks";

import "./BasicInformation.css";

export default function BasicInformation() {
  const dispatch = useDispatch();

  const personal = useSelector(
    (state) => state.personal
  );

  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] =
    useState(personal.first_name);

  const [lastName, setLastName] =
    useState(personal.last_name);

  const [weight, setWeight] =
    useState(personal.weight_kg);

  const [height, setHeight] =
    useState(personal.height_cm);

  const [profilePhoto, setProfilePhoto] =
    useState(ImageProfile);


  useEffect(() => {
    setFirstName(personal.first_name);
    setLastName(personal.last_name);
    setWeight(personal.weight_kg);
    setHeight(personal.height_cm);
  }, [personal]);


  const handleCancel = () => {
    setFirstName(personal.first_name);
    setLastName(personal.last_name);
    setWeight(personal.weight_kg);
    setHeight(personal.height_cm);

    setIsEditing(false);
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


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };


  return (
    <section className="BasicInformation">

      <Card className="ProfileCard">

        <img
          src={profilePhoto}
          className="ProfileImage"
          alt="profile"
        />


        <h2>
          {firstName || "Your"}{" "}
          {lastName || "Profile"}
        </h2>


        <div className="ProfileStats">

          <CircleData
            number={weight}
            unit="kg"
          />

          <CircleData
            number={height}
            unit="cm"
          />

        </div>


        {isEditing && (

          <div className="ProfileInputs">

            <Input
              className="ProfileInput"
              value={firstName}
              placeholder="First name"
              onChange={(e) =>
                setFirstName(e.target.value)
              }
            />


            <Input
              className="ProfileInput"
              value={lastName}
              placeholder="Last name"
              onChange={(e) =>
                setLastName(e.target.value)
              }
            />


            <Input
              className="ProfileInput"
              type="number"
              value={weight}
              placeholder="Weight"
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />


            <Input
              className="ProfileInput"
              type="number"
              value={height}
              placeholder="Height"
              onChange={(e) =>
                setHeight(e.target.value)
              }
            />


            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

          </div>

        )}


        <div className="ProfileActions">

          {!isEditing ? (

            <Button
              onClick={() =>
                setIsEditing(true)
              }
            >
              <Pencil size={16}/>
              Edit
            </Button>

          ) : (

            <>

              <Button
                variant="secondary"
                onClick={handleCancel}
              >
                <X size={16}/>
                Cancel
              </Button>


              <Button
                onClick={handleSave}
              >
                <Save size={16}/>
                Save
              </Button>

            </>

          )}

        </div>

      </Card>

    </section>
  );
}