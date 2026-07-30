import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Pencil, Save, X } from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";

import CircleData from "@/features/profile/components/CircleData/CircleData";
import { updateProfileData } from "@/features/profile/store/thunks";

import ImageProfile from "@/assets/images/profile.png";

import "./BasicInformation.css";

export default function BasicInformation() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile.first_name ?? "");
  const [lastName, setLastName] = useState(profile.last_name ?? "");
  const [weight, setWeight] = useState(profile.weight_kg ?? "");
  const [height, setHeight] = useState(profile.height_cm ?? "");
  const [profilePhoto, setProfilePhoto] = useState(ImageProfile);
  const [previousPhoto, setPreviousPhoto] = useState(ImageProfile);

  useEffect(() => {
    if (isEditing) return;

    setFirstName(profile.first_name ?? "");
    setLastName(profile.last_name ?? "");
    setWeight(profile.weight_kg ?? "");
    setHeight(profile.height_cm ?? "");
  }, [
    profile.first_name,
    profile.last_name,
    profile.weight_kg,
    profile.height_cm,
    isEditing,
  ]);

  const startEditing = () => {
    setPreviousPhoto(profilePhoto);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFirstName(profile.first_name ?? "");
    setLastName(profile.last_name ?? "");
    setWeight(profile.weight_kg ?? "");
    setHeight(profile.height_cm ?? "");
    setProfilePhoto(previousPhoto);
    setIsEditing(false);
  };

  const handleSave = () => {
    dispatch(
      updateProfileData({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        weight_kg: Number(weight) || 0,
        height_cm: Number(height) || 0,
      })
    );

    setPreviousPhoto(profilePhoto);
    setIsEditing(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfilePhoto(reader.result);
      }
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const displayName =
    [firstName, lastName].filter(Boolean).join(" ") || "Your Profile";

  const canSave =
    firstName.trim() &&
    Number(weight) > 0 &&
    Number(height) > 0;

  return (
    <section className="BasicInformation">
      <Card className="ProfileCard">
        <div className="ProfileImageWrapper">
          <img
            src={profilePhoto}
            className="ProfileImage"
            alt={`${displayName} profile`}
          />

          {isEditing && (
            <button
              type="button"
              className="ChangePhotoButton"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile photo"
            >
              <Camera size={17} />
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />

        <div className="ProfileIdentity">
          <h2>{displayName}</h2>
          <p>Profile information</p>
        </div>

        <div className="ProfileStats">
          <CircleData
            number={Number(weight) || "--"}
            unit="kg"
          />

          <CircleData
            number={Number(height) || "--"}
            unit="cm"
          />
        </div>

        {isEditing && (
          <div className="ProfileInputs">
            <label className="ProfileField">
              <span>First name</span>

              <Input
                value={firstName}
                placeholder="Enter first name"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </label>

            <label className="ProfileField">
              <span>Last name</span>

              <Input
                value={lastName}
                placeholder="Enter last name"
                onChange={(event) => setLastName(event.target.value)}
              />
            </label>

            <label className="ProfileField">
              <span>Weight</span>

              <div className="ProfileMeasurement">
                <Input
                  type="number"
                  min="1"
                  step="0.1"
                  value={weight}
                  placeholder="Enter weight"
                  onChange={(event) => setWeight(event.target.value)}
                />

                <span>kg</span>
              </div>
            </label>

            <label className="ProfileField">
              <span>Height</span>

              <div className="ProfileMeasurement">
                <Input
                  type="number"
                  min="1"
                  step="1"
                  value={height}
                  placeholder="Enter height"
                  onChange={(event) => setHeight(event.target.value)}
                />

                <span>cm</span>
              </div>
            </label>
          </div>
        )}

        <div className="ProfileActions">
          {!isEditing ? (
            <Button
              variant="secondary"
              onClick={startEditing}
            >
              <Pencil size={16} />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={handleCancel}
              >
                <X size={16} />
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                disabled={!canSave}
              >
                <Save size={16} />
                Save Profile
              </Button>
            </>
          )}
        </div>
      </Card>
    </section>
  );
}