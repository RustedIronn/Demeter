import { useDispatch, useSelector } from "react-redux";
import { Droplets, Minus, Plus } from "lucide-react";

import Card from "@/shared/ui/Card/Card";

import {
  increaseWater,
  decreaseWater,
} from "@/features/profile/store/thunks";


import {
  selectDataPoints,
  selectWaterGoal,
} from "@/features/profile/store/selectors";


import {
  selectSelectedDate,
} from "@/shared/store/selectors";


import { getDateFormatted } from "@/shared/utils/utils";

import "./WaterCard.css";


export default function WaterCard() {

  const dispatch = useDispatch();


  const dataPoints = useSelector(
    selectDataPoints
  );


  const waterGoal = useSelector(
    selectWaterGoal
  );


  const selectedDate = useSelector(
    selectSelectedDate
  );



  const selectedDateFormatted =
    getDateFormatted(selectedDate);



  const water =
    dataPoints.find(
      (day) =>
        day.date === selectedDateFormatted
    )?.water ?? 0;



  const percentage =
    waterGoal === 0
      ? 0
      : Math.min(
          (water / waterGoal) * 100,
          100
        );



  return (

    <Card className="WaterCard">

      <div className="WaterHeader">

        <div className="WaterIcon">
          <Droplets />
        </div>


        <div>

          <h2>
            Water Intake
          </h2>


          <p>
            Stay hydrated throughout the day
          </p>

        </div>

      </div>



      <div className="WaterValue">

        {water} / {waterGoal} glasses

      </div>



      <div className="WaterProgress">

        <div
          className="WaterProgressFill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>



      <div className="WaterActions">


        <button
          className="WaterButton Secondary"
          onClick={() =>
            dispatch(decreaseWater())
          }
        >

          <Minus size={18}/>

        </button>



        <button
          className="WaterButton Primary"
          onClick={() =>
            dispatch(increaseWater())
          }
        >

          <Plus size={18}/>

        </button>


      </div>


    </Card>

  );

}