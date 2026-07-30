import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ChartLine } from "lucide-react";
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

import { getNutritionTotals } from "@/features/nutrition/lib/nutritionAnalytics";
import { parseLocalDate } from "@/shared/utils/utils";

import "./NutritionHistory.css";

const METRICS = [
  {
    value: "calories",
    label: "Calories",
    unit: "kcal",
    color: "var(--color-primary)",
  },
  {
    value: "protein",
    label: "Protein",
    unit: "g",
    color: "var(--color-success)",
  },
  {
    value: "carbs",
    label: "Carbs",
    unit: "g",
    color: "var(--color-warning)",
  },
  {
    value: "fat",
    label: "Fat",
    unit: "g",
    color: "var(--color-danger)",
  },
];

export default function NutritionHistory() {
  const [metric, setMetric] = useState("calories");

  const dataPoints =
    useSelector((state) => state.profile.data_points) ?? [];

  const selectedMetric =
    METRICS.find((item) => item.value === metric) ?? METRICS[0];

  const chartData = useMemo(() => {
    return dataPoints
      .filter((day) => day.intake_list?.length > 0)
      .map((day) => {
        const parsedDate = parseLocalDate(day.date);

        return {
          rawDate: parsedDate,
          date: parsedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          }),
          ...getNutritionTotals(day.intake_list),
        };
      })
      .filter((day) => !Number.isNaN(day.rawDate.getTime()))
      .sort((first, second) => first.rawDate - second.rawDate);
  }, [dataPoints]);

  return (
    <Card className="NutritionHistory">
      <CardHeader
        title="Nutrition History"
        subtitle="Daily nutrition trends over time"
        icon={
          <div className="NutritionHistoryIcon">
            <ChartLine size={20} />
          </div>
        }
      />

      <div
        className="NutritionMetricTabs"
        role="tablist"
        aria-label="Nutrition metric"
      >
        {METRICS.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            className={metric === item.value ? "Active" : ""}
            aria-selected={metric === item.value}
            onClick={() => setMetric(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="NutritionChart">
        {chartData.length < 2 ? (
          <EmptyState
            icon={<ChartLine size={24} />}
            title="Not enough data yet"
            description="Log meals on at least two different days to see your nutrition trends."
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
                dataKey="date"
                axisLine={false}
                tickLine={false}
                minTickGap={24}
                tick={{
                  fill: "var(--color-text-muted)",
                  fontSize: 12,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                width={54}
                tick={{
                  fill: "var(--color-text-muted)",
                  fontSize: 12,
                }}
              />

              <Tooltip
                cursor={{
                  stroke: "var(--color-border)",
                  strokeDasharray: "4 4",
                }}
                content={
                  <NutritionTooltip
                    label={selectedMetric.label}
                    unit={selectedMetric.unit}
                    color={selectedMetric.color}
                  />
                }
              />

              <Line
                type="monotone"
                dataKey={metric}
                stroke={selectedMetric.color}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: selectedMetric.color,
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

function NutritionTooltip({ active, payload, label, unit, color }) {
  if (!active || !payload?.length) return null;

  const value = Math.round(Number(payload[0].value) || 0);

  return (
    <div
      className="NutritionChartTooltip"
      style={{ "--tooltip-color": color }}
    >
      <span>{payload[0].payload.date}</span>

      <strong>
        {label}: {value} {unit}
      </strong>
    </div>
  );
}