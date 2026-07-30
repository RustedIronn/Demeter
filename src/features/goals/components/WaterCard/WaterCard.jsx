import { useDispatch, useSelector } from "react-redux";
import { Droplets, Minus, Plus } from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";
import Button from "@/shared/ui/Button/Button";

import {
  decreaseWater,
  increaseWater,
} from "@/features/profile/store/thunks";

import {
  selectDataPoints,
  selectWaterGoal,
} from "@/features/profile/store/selectors";

import { selectSelectedDate } from "@/app/state/selectors";
import { getDateFormatted } from "@/shared/utils/utils";

import "./WaterCard.css";

export default function WaterCard() {
  const dispatch = useDispatch();

  const dataPoints = useSelector(selectDataPoints) ?? [];
  const waterGoal = Number(useSelector(selectWaterGoal)) || 0;
  const selectedDate = useSelector(selectSelectedDate);

  const formattedDate = getDateFormatted(selectedDate);

  const water =
    Number(
      dataPoints.find(
        (day) => day.date === formattedDate
      )?.water
    ) || 0;

  const percentage =
    waterGoal <= 0
      ? 0
      : Math.min(
          Math.max((water / waterGoal) * 100, 0),
          100
        );

  return (
    <Card className="WaterCard">
      <CardHeader
        title="Water Intake"
        subtitle="Stay hydrated throughout the day"
        icon={
          <div className="WaterIcon">
            <Droplets size={20} />
          </div>
        }
      />

      <div className="WaterContent">
        <div className="WaterValue">
          <strong>{water}</strong>

          <span>
            of {waterGoal || "--"} glasses
          </span>
        </div>

        <div
          className="WaterProgress"
          role="progressbar"
          aria-label="Water intake progress"
          aria-valuemin="0"
          aria-valuemax={waterGoal || 0}
          aria-valuenow={water}
        >
          <div
            className="WaterProgressFill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <span className="WaterPercentage">
          {Math.round(percentage)}% of daily goal
        </span>
      </div>

      <div className="WaterActions">
        <Button
          type="button"
          variant="secondary"
          size="small"
          className="WaterActionButton"
          onClick={() => dispatch(decreaseWater())}
          disabled={water <= 0}
          aria-label="Remove one glass of water"
        >
          <Minus size={18} />
        </Button>

        <Button
          type="button"
          size="small"
          className="WaterActionButton WaterAddButton"
          onClick={() => dispatch(increaseWater())}
          aria-label="Add one glass of water"
        >
          <Plus size={18} />
        </Button>
      </div>
    </Card>
  );
}