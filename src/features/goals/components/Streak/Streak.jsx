import { useSelector } from "react-redux";
import { Award, Flame } from "lucide-react";

import Card from "@/shared/ui/Card/Card";
import CardHeader from "@/shared/ui/CardHeader/CardHeader";

import { getStreakData } from "@/features/nutrition/lib/nutritionAnalytics";

import "./Streak.css";

export default function Streak() {
  const profile = useSelector((state) => state.profile);

  const streak = getStreakData(profile.data_points ?? [], {
    calories: Number(profile.daily_goal) || 0,
    protein: Number(profile.protein_goal) || 0,
  });

  const currentStreak = Number(streak.currentStreak) || 0;
  const longestStreak = Number(streak.longestStreak) || 0;

  return (
    <Card className="Streak">
      <CardHeader
        title="Streak"
        subtitle="Keep your momentum going"
        icon={
          <div className="StreakIcon">
            <Flame size={20} />
          </div>
        }
      />

      <div className="CurrentStreak">
        <div className="CurrentStreakValue">
          <strong>{currentStreak}</strong>
          <span>{currentStreak === 1 ? "day" : "days"}</span>
        </div>

        <p>
          {currentStreak > 0
            ? "You’re building a consistent routine."
            : "Complete your goals today to start a streak."}
        </p>
      </div>

      <div className="LongestStreak">
        <div className="LongestStreakLabel">
          <Award size={18} />

          <span>Longest streak</span>
        </div>

        <strong>
          {longestStreak} {longestStreak === 1 ? "day" : "days"}
        </strong>
      </div>
    </Card>
  );
}