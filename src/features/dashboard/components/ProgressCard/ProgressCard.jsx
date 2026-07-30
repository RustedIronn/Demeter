import Card from "@/shared/ui/Card/Card";
import Badge from "@/shared/ui/Badge/Badge";

import "./ProgressCard.css";

function formatValue(value) {
  const number = Number(value) || 0;
  return Number(number.toFixed(2));
}

export default function ProgressCard({
  title,
  current = 0,
  goal = 0,
  unit = "",
  color = "var(--color-primary)",
}) {
  const safeCurrent = Number(current) || 0;
  const safeGoal = Number(goal) || 0;

  const percentage =
    safeGoal <= 0
      ? 0
      : Math.min(Math.max((safeCurrent / safeGoal) * 100, 0), 100);

  return (
    <Card
      className="ProgressCard"
      style={{ "--progress-color": color }}
    >
      <div className="ProgressCardHeader">
        <span className="ProgressTitle">{title}</span>

        <Badge className="ProgressPercentage">
          {Math.round(percentage)}%
        </Badge>
      </div>

      <div className="ProgressNumbers">
        <strong>
          {formatValue(safeCurrent)}
          {unit}
        </strong>

        <span>
          of {formatValue(safeGoal)}
          {unit}
        </span>
      </div>

      <div
        className="ProgressTrack"
        role="progressbar"
        aria-label={`${title} progress`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(percentage)}
      >
        <div
          className="ProgressFill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  );
}