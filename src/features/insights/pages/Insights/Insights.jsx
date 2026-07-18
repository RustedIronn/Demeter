import Analytics from "@/features/dashboard/components/Analytics/Analytics";
import NutritionHistory from "@/features/nutrition/components/NutritionHistory/NutritionHistory";
import WeightHistory from "@/features/goals/components/WeightHistory/WeightHistory";

import "./Insights.css";

export default function Insights() {
  return (
    <div className="Insights">

      <section className="PageHeader">
        <h1>Insights</h1>

        <p>
          Analyze your nutrition and progress over time.
        </p>
      </section>

      <div className="InsightsGrid">

        <Analytics />

        <NutritionHistory />

        <WeightHistory />

      </div>

    </div>
  );
}