import clsx from "clsx";
import "./Badge.css";

export default function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  return (
    <span
      className={clsx("Badge", `Badge--${variant}`, className)}
      {...props}
    >
      {children}
    </span>
  );
}
