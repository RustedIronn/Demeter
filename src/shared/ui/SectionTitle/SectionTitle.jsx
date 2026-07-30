import clsx from "clsx";
import "./SectionTitle.css";

export default function SectionTitle({
  title,
  subtitle,
  action,
  className = "",
}) {
  return (
    <div className={clsx("SectionTitle", className)}>
      <div className="SectionTitleText">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="SectionTitleAction">{action}</div>}
    </div>
  );
}
