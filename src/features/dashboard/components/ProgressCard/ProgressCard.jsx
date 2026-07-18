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
    <Card className="ProgressCard">
      <div className="ProgressCardHeader">
        <span>{title}</span>

        <span>
          {current}
          {unit} / {goal}
          {unit}
        </span>
      </div>


      <div className="ProgressTrack">
        <div
          className="ProgressFill"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>

    </Card>
  );
}