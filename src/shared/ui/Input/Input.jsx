import clsx from "clsx";
import "./Input.css";

export default function Input({
  className = "",
  error = false,
  ...props
}) {
  return (
    <input
      className={clsx("ui-input", { "ui-input--error": error }, className)}
      {...props}
    />
  );
}
