import { Scale } from "lucide-react";
import Card from "@/shared/ui/Card/Card";
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
    <Card className="WeightHistory">

      <div className="WeightHistoryHeader">

        <div className="WeightHistoryIcon">
          <Scale />
        </div>

        <div>
          <h2>Weight History</h2>
          <p>Your progress over time</p>
        </div>

      </div>

      <div className="WeightHistoryEmpty">
        No weight history available.
      </div>

    </Card>
  );
}

  const chartData = [...history]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((entry) => ({
      ...entry,
      label: formatDate(entry.date),
    }));

  return (
  <Card className="WeightHistory">

    <div className="WeightHistoryHeader">

      <div className="WeightHistoryIcon">
        <Scale />
      </div>

      <div>
        <h2>Weight History</h2>
        <p>Your progress over time</p>
      </div>

    </div>

    <ResponsiveContainer
      width="100%"
      height={250}
    >
      <LineChart data={chartData}>

        <CartesianGrid
          stroke="var(--color-border)"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="label"
          stroke="var(--color-text-muted)"
        />

        <YAxis
          stroke="var(--color-text-muted)"
        />

        <Tooltip
          contentStyle={{
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            color: "var(--color-text)",
          }}
        />

        <Line
          type="monotone"
          dataKey="weight"
          stroke="var(--color-success)"
          strokeWidth={3}
          dot={{
            r: 5,
            fill: "var(--color-success)",
          }}
          activeDot={{
            r: 7,
          }}
        />

      </LineChart>
    </ResponsiveContainer>

  </Card>
);
}