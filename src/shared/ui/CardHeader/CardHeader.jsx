import "./CardHeader.css";

export default function CardHeader({
  icon,
  title,
  subtitle,
  action,
}) {
  return (
    <div className="CardHeader">
      <div className="CardHeaderContent">
        {icon && (
          <div className="CardHeaderIcon">
            {icon}
          </div>
        )}

        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      {action && (
        <div className="CardHeaderAction">
          {action}
        </div>
      )}
    </div>
  );
}