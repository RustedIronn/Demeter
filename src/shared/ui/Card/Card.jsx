import clsx from "clsx";
import "./Card.css";

export default function Card({
  children,
  className = "",
  hover = false,
  clickable = false,
  padding = "md",
  ...props
}) {
  return (
    <div
      className={clsx(
        "ui-card",
        `ui-card--${padding}`,
        {
          "ui-card--hover": hover,
          "ui-card--clickable": clickable,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}