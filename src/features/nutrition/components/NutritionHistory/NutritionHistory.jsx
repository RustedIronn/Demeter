import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ChartLine } from "lucide-react";

import { getNutritionTotals } from "@/shared/utils/nutritionAnalytics";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./NutritionHistory.css";

export default function NutritionHistory() {

  const [metric, setMetric] = useState("calories");

  const dataPoints = useSelector(
    (state) => state.personal.data_points
  );

  const chartData = useMemo(() => {

    return dataPoints.map((day) => ({

      date: new Date(day.date).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
        }
      ),

      ...getNutritionTotals(day.intake_list),

    }));

  }, [dataPoints]);

  return (

    <section className="NutritionHistory">

      <div className="NutritionHistoryHeader">

        <div className="NutritionHistoryIcon">
          <ChartLine />
        </div>

        <div>

          <h2>
            Nutrition History
          </h2>

          <p>
            Daily nutrition trends
          </p>

        </div>

      </div>

      <div className="MetricTabs">

        {[
          "calories",
          "protein",
          "carbs",
          "fat",
        ].map((item) => (

          <button
            key={item}
            className={
              metric === item
                ? "Active"
                : ""
            }
            onClick={() =>
              setMetric(item)
            }
          >
            {item}
          </button>

        ))}

      </div>

      <ResponsiveContainer
        width="100%"
        height={260}
      >

        <LineChart data={chartData}>

          <CartesianGrid
            stroke="var(--color-border)"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
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
            }}
          />

          <Line
            type="monotone"
            dataKey={metric}
            stroke="var(--color-success)"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 7,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </section>

  );

}