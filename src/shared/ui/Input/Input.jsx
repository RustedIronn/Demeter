import clsx from "clsx";
import "./Input.css";

export default function Input({
  className = "",
  ...props
}) {
  return (
    <input
      className={clsx("ui-input", className)}
      {...props}
    />
  );
}   