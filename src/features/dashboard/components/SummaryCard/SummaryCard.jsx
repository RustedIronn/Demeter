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
    <Card className="SummaryCard">
      <div className="SummaryCardHeader">
        <div
          className="SummaryCardIcon"
          style={{ color: accent }}
        >
          {icon}
        </div>

        <span>{title}</span>
      </div>

      <h2>{value}</h2>

      <p>{subtitle}</p>
    </Card>
  );
}