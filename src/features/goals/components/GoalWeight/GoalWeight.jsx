import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Pencil,
  Save,
  X,
  Target,
} from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";

import {
  setGoalWeight,
} from "@/features/profile/store/thunks";

import "./GoalWeight.css";


export default function GoalWeight() {

  const dispatch = useDispatch();


  const currentWeight = useSelector(
    (state) => state.personal.weight_kg
  );


  const goalWeight = useSelector(
    (state) => state.personal.goal_weight
  );


  const [isEditing,setIsEditing] =
    useState(false);


  const [goal,setGoal] =
    useState(goalWeight);



  useEffect(()=>{

    setGoal(goalWeight);

  },[goalWeight]);



  const difference =
    Math.abs(
      currentWeight - goalWeight
    );



  let message =
    "Set your target weight";



  if(goalWeight > 0){

    if(currentWeight > goalWeight){

      message =
        `${difference} kg remaining`;

    }

    else if(currentWeight < goalWeight){

      message =
        `${difference} kg to gain`;

    }

    else {

      message =
        "Goal achieved 🎉";

    }

  }



  const saveGoal = () => {

    dispatch(
      setGoalWeight(goal)
    );

    setIsEditing(false);

  };



  const cancelEdit = () => {

    setGoal(goalWeight);

    setIsEditing(false);

  };



  return (

    <Card className="GoalWeight">


      <div className="GoalWeightHeader">


        <div className="GoalWeightIcon">

          <Target/>

        </div>


        <div>

          <h2>
            Goal Weight
          </h2>


          <p>
            Track your weight target
          </p>

        </div>


      </div>




      <div className="WeightComparison">


        <div>

          <span>
            Current
          </span>


          <strong>
            {currentWeight}
            <small>kg</small>
          </strong>

        </div>



        <div className="Divider"/>



        <div>

          <span>
            Target
          </span>


          {isEditing ? (

            <Input

              className="GoalWeightInput"

              type="number"

              value={goal}

              onChange={(e)=>
                setGoal(
                  Number(e.target.value)
                )
              }

            />

          ) : (

            <strong>

              {
                goalWeight > 0
                ? goalWeight
                : "--"
              }

              <small>
                kg
              </small>

            </strong>

          )}

        </div>


      </div>




      <div className="GoalWeightStatus">

        {message}

      </div>




      <div className="GoalWeightActions">


        {!isEditing ? (

          <Button
            onClick={()=>
              setIsEditing(true)
            }
          >

            <Pencil size={16}/>

            Edit Goal

          </Button>


        ) : (

          <>

            <Button

              variant="secondary"

              onClick={cancelEdit}

            >

              <X size={16}/>

              Cancel

            </Button>



            <Button

              onClick={saveGoal}

            >

              <Save size={16}/>

              Save

            </Button>

          </>

        )}


      </div>


    </Card>

  );

}