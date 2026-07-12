import { Button, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseWater,
  decreaseWater,
} from "../../store/personal/thunks";

import { getDateFormatted } from "../../assets/utils/utils";

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
      : Math.min(
          (water / waterGoal) * 100,
          100
        );

  return (
    <div className="WaterCard">
      <h5>💧 Water Intake</h5>

      <div className="WaterCardValue">
        {water} / {waterGoal} glasses
      </div>

      <ProgressBar
        now={percentage}
        className="mb-3"
      />

      <div className="d-flex justify-content-center gap-2">
        <Button
          variant="outline-primary"
          onClick={() =>
            dispatch(decreaseWater())
          }
        >
          −
        </Button>

        <Button
          variant="primary"
          onClick={() =>
            dispatch(increaseWater())
          }
        >
          +
        </Button>
      </div>
    </div>
  );
}