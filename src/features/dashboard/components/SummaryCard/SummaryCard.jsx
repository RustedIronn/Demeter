import Card from "@/shared/ui/Card/Card";
import "./SummaryCard.css";

export default function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  accent,
}) {
  return (
    <Card
      className="SummaryCard"
      style={{
        "--accent": accent,
      }}
    >

      <div className="SummaryCardHeader">

        <div className="SummaryCardIcon">
          {icon}
        </div>

        <span>
          {title}
        </span>

      </div>


      <div className="SummaryCardValue">
        <h2>
          {value}
        </h2>

        <p>
          {subtitle}
        </p>
      </div>

    </Card>
  );
}