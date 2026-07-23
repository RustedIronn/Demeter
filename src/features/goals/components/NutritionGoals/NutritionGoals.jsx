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

import {
  updatePersonalData,
} from "@/features/profile/store/thunks";

import "./NutritionGoals.css";


export default function NutritionGoals() {

  const dispatch = useDispatch();


  const personal = useSelector(
    (state) => state.personal
  );


  const [isEditing,setIsEditing] =
    useState(false);


  const [calories,setCalories] =
    useState(personal.daily_goal);

  const [protein,setProtein] =
    useState(personal.protein_goal);

  const [carbs,setCarbs] =
    useState(personal.carbs_goal);

  const [fat,setFat] =
    useState(personal.fat_goal);



  useEffect(()=>{

    setCalories(personal.daily_goal);
    setProtein(personal.protein_goal);
    setCarbs(personal.carbs_goal);
    setFat(personal.fat_goal);

  },[
    personal.daily_goal,
    personal.protein_goal,
    personal.carbs_goal,
    personal.fat_goal
  ]);



  const saveGoals = () => {

    dispatch(
      updatePersonalData({

        daily_goal: calories,

        protein_goal: protein,

        carbs_goal: carbs,

        fat_goal: fat,

      })
    );


    setIsEditing(false);

  };



  const cancelEdit = () => {

    setCalories(personal.daily_goal);
    setProtein(personal.protein_goal);
    setCarbs(personal.carbs_goal);
    setFat(personal.fat_goal);

    setIsEditing(false);

  };



  return (

    <Card className="NutritionGoals">


      <div className="NutritionGoalsHeader">

        <div>

          <h2>
            Nutrition Goals
          </h2>

          <p>
            Your daily targets
          </p>

        </div>


        {!isEditing && (

          <Button
            onClick={() =>
              setIsEditing(true)
            }
          >

            <Pencil size={16}/>

            Edit

          </Button>

        )}

      </div>




      <div className="NutritionGoalsGrid">


        <GoalInput
          label="Calories"
          icon="🔥"
          unit="kcal"
          value={calories}
          editing={isEditing}
          onChange={setCalories}
        />


        <GoalInput
          label="Protein"
          icon="🥩"
          unit="g"
          value={protein}
          editing={isEditing}
          onChange={setProtein}
        />


        <GoalInput
          label="Carbs"
          icon="🍚"
          unit="g"
          value={carbs}
          editing={isEditing}
          onChange={setCarbs}
        />


        <GoalInput
          label="Fat"
          icon="🥑"
          unit="g"
          value={fat}
          editing={isEditing}
          onChange={setFat}
        />


      </div>




      {isEditing && (

        <div className="NutritionGoalActions">


          <Button
            variant="secondary"
            onClick={cancelEdit}
          >

            <X size={16}/>

            Cancel

          </Button>


          <Button
            onClick={saveGoals}
          >

            <Save size={16}/>

            Save

          </Button>


        </div>

      )}


    </Card>

  );

}



function GoalInput({
  label,
  icon,
  unit,
  value,
  editing,
  onChange,
}) {


  return (

    <div className="GoalInput">


      <div className="GoalLabel">

        <span>
          {icon}
        </span>


        <p>
          {label}
        </p>

      </div>



      {editing ? (

        <Input

          className="GoalInputField"

          type="number"

          value={value}

          onChange={(e)=>
            onChange(
              Number(e.target.value)
            )
          }

        />


      ) : (

        <strong>

          {value}

          <small>
            {unit}
          </small>

        </strong>

      )}


    </div>

  );

}