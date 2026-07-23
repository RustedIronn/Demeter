import Card from "@/shared/ui/Card/Card";
import "./ProgressCard.css";

export default function ProgressCard({
  title,
  current,
  goal,
  unit,
  color,
}) {
  const percentage =
    goal === 0
      ? 0
      : Math.min((current / goal) * 100, 100);

  return (
    <Card
      className="ProgressCard"
      style={{
        "--progress-color": color,
      }}
    >

      <div className="ProgressCardHeader">

        <span className="ProgressTitle">
          {title}
        </span>

        <span className="ProgressPercentage">
          {Math.round(percentage)}%
        </span>

      </div>


      <div className="ProgressNumbers">

        <strong>
          {current}
          {unit}
        </strong>

        <span>
          / {goal}{unit}
        </span>

      </div>


      <div className="ProgressTrack">

        <div
          className="ProgressFill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>


    </Card>
  );
}