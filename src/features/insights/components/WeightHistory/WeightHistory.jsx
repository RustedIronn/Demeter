import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Scale } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";
import EmptyState from "@/shared/ui/EmptyState/EmptyState";

import { parseLocalDate } from "@/shared/utils/utils";

import "./WeightHistory.css";

function formatDate(date) {
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
}

export default function WeightHistory() {
  const history =
    useSelector((state) => state.profile.weight_history) ?? [];

  const chartData = useMemo(() => {
    return history
      .map((entry) => {
        const date = parseLocalDate(entry.date);
        const weight = Number(entry.weight);

        return {
          date,
          label: formatDate(date),
          weight,
        };
      })
      .filter(
        (entry) =>
          !Number.isNaN(entry.date.getTime()) &&
          Number.isFinite(entry.weight)
      )
      .sort((first, second) => first.date - second.date);
  }, [history]);

  const weights = chartData.map((entry) => entry.weight);

  const minimumWeight = weights.length
    ? Math.floor(Math.min(...weights) - 2)
    : 0;

  const maximumWeight = weights.length
    ? Math.ceil(Math.max(...weights) + 2)
    : 100;

  return (
    <Card className="WeightHistory">
      <CardHeader
        title="Weight History"
        subtitle="Your progress over time"
        icon={
          <div className="WeightHistoryIcon">
            <Scale size={20} />
          </div>
        }
      />

      <div className="WeightHistoryChart">
        {chartData.length < 2 ? (
          <EmptyState
            icon={<Scale size={24} />}
            title={
              chartData.length === 0
                ? "No weight entries yet"
                : "Add another weight entry"
            }
            description={
              chartData.length === 0
                ? "Record your weight to begin tracking progress."
                : "At least two entries are needed to display a trend."
            }
          />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={chartData}
              margin={{
                top: 12,
                right: 12,
                left: -8,
                bottom: 0,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--color-divider)"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                minTickGap={24}
                tick={{
                  fill: "var(--color-text-muted)",
                  fontSize: 12,
                }}
              />

              <YAxis
                domain={[minimumWeight, maximumWeight]}
                axisLine={false}
                tickLine={false}
                width={54}
                tick={{
                  fill: "var(--color-text-muted)",
                  fontSize: 12,
                }}
                tickFormatter={(value) => `${value} kg`}
              />

              <Tooltip
                cursor={{
                  stroke: "var(--color-border)",
                  strokeDasharray: "4 4",
                }}
                content={<WeightTooltip />}
              />

              <Line
                type="monotone"
                dataKey="weight"
                stroke="var(--color-success)"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--color-success)",
                  stroke: "var(--color-card)",
                  strokeWidth: 3,
                }}
                animationDuration={450}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

function WeightTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const entry = payload[0].payload;

  return (
    <div className="WeightChartTooltip">
      <span>{entry.label}</span>
      <strong>{Number(entry.weight).toFixed(1)} kg</strong>
    </div>
  );
}