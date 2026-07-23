import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pencil,
  Save,
  X,
  Camera,
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

  const fileInputRef = useRef(null);

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

        <div className="ProfileImageWrapper">

          <img
            src={profilePhoto}
            className="ProfileImage"
            alt="Profile"
          />

          {isEditing && (

            <button
              className="ChangePhotoButton"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <Camera size={18}/>
            </button>

          )}

        </div>

        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <h2>

          {firstName || "Your"}{" "}
          {lastName || "Profile"}

        </h2>

        <p className="ProfileSubtitle">
          Personal Information
        </p>

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
              value={firstName}
              placeholder="First name"
              onChange={(e)=>
                setFirstName(e.target.value)
              }
            />

            <Input
              value={lastName}
              placeholder="Last name"
              onChange={(e)=>
                setLastName(e.target.value)
              }
            />

            <Input
              type="number"
              value={weight}
              placeholder="Weight"
              onChange={(e)=>
                setWeight(e.target.value)
              }
            />

            <Input
              type="number"
              value={height}
              placeholder="Height"
              onChange={(e)=>
                setHeight(e.target.value)
              }
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

              Edit Profile

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