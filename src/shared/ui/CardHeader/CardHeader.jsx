import clsx from "clsx";
import "./CardHeader.css";

export default function CardHeader({
  icon,
  title,
  subtitle,
  action,
  className = "",
}) {
  return (
    <div className={clsx("CardHeader", className)}>
      <div className="CardHeaderContent">
        {icon && <div className="CardHeaderIcon">{icon}</div>}
        <div className="CardHeaderText">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {action && <div className="CardHeaderAction">{action}</div>}
    </div>
  );
}
