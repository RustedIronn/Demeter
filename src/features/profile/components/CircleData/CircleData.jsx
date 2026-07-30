import "./CircleData.css";

export default function CircleData({ number, unit }) {
  const displayValue =
    number === null ||
    number === undefined ||
    number === ""
      ? "--"
      : number;

  return (
    <div className="CircleData">
      <strong>{displayValue}</strong>
      <span>{unit}</span>
    </div>
  );
}