import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./WeightHistory.css";

export default function WeightHistory() {
  const history = useSelector(
    (state) => state.personal.weight_history
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  if (!history || history.length === 0) {
    return (
      <div className="WeightHistory">
        <h4>Weight History</h4>
        <p>No weight history available.</p>
      </div>
    );
  }

  const chartData = [...history]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((entry) => ({
      ...entry,
      label: formatDate(entry.date),
    }));

  return (
    <div className="WeightHistory">
      <h4>Weight History</h4>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="label" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="weight"
            stroke="#4CAF50"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}