import "./EmptyState.css";

export default function EmptyState({
  icon,
  title,
  description,
}) {
  return (
    <div className="EmptyState">
      {icon && (
        <div className="EmptyStateIcon">
          {icon}
        </div>
      )}

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}