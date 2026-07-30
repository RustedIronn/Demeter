import { motion } from "framer-motion";

import Analytics from "@/features/insights/components/Analytics/Analytics";
import NutritionHistory from "@/features/insights/components/NutritionHistory/NutritionHistory";
import WeightHistory from "@/features/insights/components/WeightHistory/WeightHistory";

import "./Insights.css";

const sectionAnimation = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Insights() {
  return (
    <main className="Insights">
      <motion.header
        className="InsightsHeader"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: .35 }}
      >
        <h1>Insights</h1>
        <p>Analyze your nutrition and progress over time.</p>
      </motion.header>

      <motion.div
        className="InsightsGrid"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: .35, delay: .1 }}
      >
        <div className="InsightsAnalytics">
          <Analytics />
        </div>

        <div className="InsightsNutrition">
          <NutritionHistory />
        </div>

        <div className="InsightsWeight">
          <WeightHistory />
        </div>
      </motion.div>
    </main>
  );
}