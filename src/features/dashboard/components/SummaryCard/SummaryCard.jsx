import Card from "@/shared/ui/Card/Card";
import "./SummaryCard.css";

export default function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  accent = "var(--color-primary)",
}) {
  return (
    <Card
      className="SummaryCard"
      style={{ "--summary-accent": accent }}
    >
      <div className="SummaryCardHeader">
        <div className="SummaryCardIcon">
          {icon}
        </div>

        <span>{title}</span>
      </div>

      <div className="SummaryCardContent">
        <strong>{value}</strong>
        <p>{subtitle}</p>
      </div>
    </Card>
  );
}