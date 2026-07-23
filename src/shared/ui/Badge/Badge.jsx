import "./Badge.css";

export default function Badge({
  children,
  variant = "default",
}) {
  return (
    <span className={`Badge Badge--${variant}`}>
      {children}
    </span>
  );
}