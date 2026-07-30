import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BarChart3 } from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";

import {
  getGoalAchievement,
  getNutritionAverage,
} from "@/features/nutrition/lib/nutritionAnalytics";

import { parseLocalDate } from "@/shared/utils/utils";

import "./Analytics.css";

const PERIODS = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const STATS = [
  {
    key: "calories",
    label: "Calories",
    unit: "kcal",
    color: "var(--color-primary)",
  },
  {
    key: "protein",
    label: "Protein",
    unit: "g",
    color: "var(--color-success)",
  },
  {
    key: "carbs",
    label: "Carbs",
    unit: "g",
    color: "var(--color-warning)",
  },
  {
    key: "fat",
    label: "Fat",
    unit: "g",
    color: "var(--color-danger)",
  },
];

function isDateInPeriod(date, period, now) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return false;
  }

  const currentDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const targetDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (targetDay > currentDay) return false;

  if (period === "week") {
    const difference =
      (currentDay - targetDay) / (1000 * 60 * 60 * 24);

    return difference < 7;
  }

  if (period === "month") {
    return (
      targetDay.getMonth() === currentDay.getMonth() &&
      targetDay.getFullYear() === currentDay.getFullYear()
    );
  }

  return targetDay.getFullYear() === currentDay.getFullYear();
}

export default function Analytics() {
  const [period, setPeriod] = useState("week");
  const profile = useSelector((state) => state.profile);

  const analytics = useMemo(() => {
    const now = new Date();
    const dataPoints = profile.data_points ?? [];

    const filteredData = dataPoints.filter((day) =>
      isDateInPeriod(parseLocalDate(day.date), period, now)
    );

    const averages = getNutritionAverage(filteredData);
    const achievements = getGoalAchievement(filteredData, {
      calories: Number(profile.daily_goal) || 0,
      protein: Number(profile.protein_goal) || 0,
      carbs: Number(profile.carbs_goal) || 0,
      fat: Number(profile.fat_goal) || 0,
    });

    return {
      averages,
      achievements,
    };
  }, [
    period,
    profile.data_points,
    profile.daily_goal,
    profile.protein_goal,
    profile.carbs_goal,
    profile.fat_goal,
  ]);

  const totalDays =
    Number(analytics.achievements.totalDays) || 0;

  return (
    <Card className="Analytics">
      <CardHeader
        title="Analytics"
        subtitle="Average nutrition and goal performance"
        icon={
          <div className="AnalyticsIcon">
            <BarChart3 size={20} />
          </div>
        }
      />

      <div
        className="AnalyticsTabs"
        role="tablist"
        aria-label="Analytics period"
      >
        {PERIODS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            role="tab"
            className={period === value ? "Active" : ""}
            aria-selected={period === value}
            onClick={() => setPeriod(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="AnalyticsSection">
        <div className="AnalyticsSectionHeader">
          <h3>Daily averages</h3>
          <span>Selected {period}</span>
        </div>

        <div className="AnalyticsGrid">
          {STATS.map(({ key, label, unit, color }) => (
            <Stat
              key={key}
              title={label}
              value={analytics.averages[key]}
              unit={unit}
              color={color}
            />
          ))}
        </div>
      </div>

      <div className="AnalyticsSection">
        <div className="AnalyticsSectionHeader">
          <h3>Goal achievement</h3>
          <span>
            {totalDays} {totalDays === 1 ? "day" : "days"} tracked
          </span>
        </div>

        <div className="GoalHits">
          {STATS.map(({ key, label, color }) => (
            <GoalHit
              key={key}
              title={label}
              hit={analytics.achievements[`${key}Hit`]}
              total={totalDays}
              color={color}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

function Stat({ title, value, unit, color }) {
  const displayValue = Math.round(Number(value) || 0);

  return (
    <div
      className="AnalyticsStat"
      style={{ "--stat-color": color }}
    >
      <span>{title}</span>

      <div>
        <strong>{displayValue}</strong>
        <small>{unit}</small>
      </div>
    </div>
  );
}

function GoalHit({ title, hit, total, color }) {
  const completed = Number(hit) || 0;

  const percentage =
    total > 0
      ? Math.min(Math.max((completed / total) * 100, 0), 100)
      : 0;

  return (
    <div
      className="GoalHit"
      style={{ "--goal-hit-color": color }}
    >
      <div className="GoalHitHeader">
        <span>{title}</span>
        <strong>{completed} / {total}</strong>
      </div>

      <div
        className="GoalHitTrack"
        role="progressbar"
        aria-label={`${title} goal achievement`}
        aria-valuemin="0"
        aria-valuemax={total}
        aria-valuenow={completed}
      >
        <div
          className="GoalHitFill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}