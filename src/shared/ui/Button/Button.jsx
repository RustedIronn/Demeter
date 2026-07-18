import clsx from "clsx";
import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        "ui-button",
        `ui-button--${variant}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}