import clsx from "clsx";
import "./EmptyState.css";

export default function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "EmptyState",
        { "EmptyState--compact": compact },
        className
      )}
    >
      {icon && <div className="EmptyStateIcon">{icon}</div>}
      <div className="EmptyStateText">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="EmptyStateAction">{action}</div>}
    </div>
  );
}
