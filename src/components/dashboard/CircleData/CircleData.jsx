import "./CircleData.css";

export default function CircleData({
  number,
  unit,
}) {
  return (
    <div className="CircleData">

      <strong>
        {number || "--"}
      </strong>

      <span>
        {unit}
      </span>

    </div>
  );
}