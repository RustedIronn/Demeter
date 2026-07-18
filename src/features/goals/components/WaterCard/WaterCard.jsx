import { useDispatch, useSelector } from "react-redux";
import { Droplets, Minus, Plus } from "lucide-react";
import Card from "@/shared/ui/Card/Card";
import Button from "@/shared/ui/Button/Button";
import {
  increaseWater,
  decreaseWater,
} from "@/features/profile/store/thunks";

import { getDateFormatted } from "@/shared/utils/utils";

import "./WaterCard.css";

export default function WaterCard() {
  const dispatch = useDispatch();

  const { data_points, waterGoal } = useSelector(
    (state) => state.personal
  );

  const selectedDate = useSelector(
    (state) => state.general.dateSelected
  );

  const selectedDateFormatted =
    getDateFormatted(selectedDate);

  const water =
    data_points.find(
      (day) => day.date === selectedDateFormatted
    )?.water ?? 0;

  const percentage =
    waterGoal === 0
      ? 0
      : Math.min((water / waterGoal) * 100, 100);

  return (
  <Card className="WaterCard">

    <div className="WaterHeader">

      <div className="WaterIcon">
        <Droplets />
      </div>

      <div>
        <h2>Water Intake</h2>
        <p>Stay hydrated throughout the day</p>
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

     <Button
  variant="secondary"
  onClick={() => dispatch(decreaseWater())}
>
  <Minus size={18} />
</Button>

<Button
  variant="primary"
  onClick={() => dispatch(increaseWater())}
>
  <Plus size={18} />
</Button>

    </div>

  </Card>
);
}