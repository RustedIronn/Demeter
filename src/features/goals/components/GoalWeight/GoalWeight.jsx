import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Save, Target, X } from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";

import { setGoalWeight } from "@/features/profile/store/thunks";

import "./GoalWeight.css";

export default function GoalWeight() {
  const dispatch = useDispatch();

  const currentWeight =
    Number(useSelector((state) => state.profile.weight_kg)) || 0;

  const goalWeight =
    Number(useSelector((state) => state.profile.goal_weight)) || 0;

  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState(goalWeight);

  useEffect(() => {
    if (!isEditing) {
      setGoal(goalWeight);
    }
  }, [goalWeight, isEditing]);

  const status = useMemo(() => {
    if (goalWeight <= 0) {
      return {
        message: "Set a target weight to begin tracking",
        type: "neutral",
      };
    }

    const difference = Math.abs(currentWeight - goalWeight);

    if (currentWeight > goalWeight) {
      return {
        message: `${difference.toFixed(1)} kg remaining`,
        type: "progress",
      };
    }

    if (currentWeight < goalWeight) {
      return {
        message: `${difference.toFixed(1)} kg to gain`,
        type: "progress",
      };
    }

    return {
      message: "Goal achieved",
      type: "success",
    };
  }, [currentWeight, goalWeight]);

  const saveGoal = () => {
    const nextGoal = Number(goal);

    if (!Number.isFinite(nextGoal) || nextGoal <= 0) return;

    dispatch(setGoalWeight(nextGoal));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setGoal(goalWeight);
    setIsEditing(false);
  };

  return (
    <Card className="GoalWeight">
      <CardHeader
        title="Goal Weight"
        subtitle="Track progress toward your weight target"
        icon={
          <div className="GoalWeightIcon">
            <Target size={20} />
          </div>
        }
      />

      <div className="WeightComparison">
        <div className="WeightMetric">
          <span>Current</span>

          <div className="WeightValue">
            <strong>{currentWeight || "--"}</strong>
            <small>kg</small>
          </div>
        </div>

        <div className="WeightDivider" />

        <div className="WeightMetric">
          <span>Target</span>

          {isEditing ? (
            <div className="GoalWeightField">
              <Input
                type="number"
                min="1"
                step="0.1"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                aria-label="Target weight"
              />

              <span>kg</span>
            </div>
          ) : (
            <div className="WeightValue">
              <strong>{goalWeight || "--"}</strong>
              <small>kg</small>
            </div>
          )}
        </div>
      </div>

      <div
        className={`GoalWeightStatus GoalWeightStatus-${status.type}`}
      >
        {status.message}
      </div>

      <div className="GoalWeightActions">
        {!isEditing ? (
          <Button
            variant="secondary"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={16} />
            Edit Goal
          </Button>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={cancelEdit}
            >
              <X size={16} />
              Cancel
            </Button>

            <Button
              onClick={saveGoal}
              disabled={!Number(goal) || Number(goal) <= 0}
            >
              <Save size={16} />
              Save Goal
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}