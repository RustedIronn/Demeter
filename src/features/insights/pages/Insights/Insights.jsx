import Analytics from "@/features/insights/components/Analytics/Analytics";
import NutritionHistory from "@/features/insights/components/NutritionHistory/NutritionHistory";
import WeightHistory from "@/features/insights/components/WeightHistory/WeightHistory";

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

        <div className="AnalyticsWrapper">
          <Analytics />
        </div>


        <div className="NutritionWrapper">
          <NutritionHistory />
        </div>


        <div className="WeightWrapper">
          <WeightHistory />
        </div>

      </div>

    </div>
  );
}