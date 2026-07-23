export default function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="SectionTitle">
      <h2>{title}</h2>

      {subtitle && (
        <p>{subtitle}</p>
      )}
    </div>
  );
}