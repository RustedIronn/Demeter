import clsx from "clsx";
import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
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
        `ui-button--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
