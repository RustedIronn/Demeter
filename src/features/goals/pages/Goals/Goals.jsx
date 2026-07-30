import { motion } from "framer-motion";

import Exercise from "@/features/goals/components/Exercise/Exercise";
import WaterCard from "@/features/goals/components/WaterCard/WaterCard";
import GoalWeight from "@/features/goals/components/GoalWeight/GoalWeight";
import NutritionGoals from "@/features/goals/components/NutritionGoals/NutritionGoals";
import Streak from "@/features/goals/components/Streak/Streak";

import "./Goals.css";

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

export default function Goals() {
  return (
    <main className="Goals">
      <motion.header
        className="GoalsHeader"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: .35 }}
      >
        <h1>Goals</h1>
        <p>Manage your daily targets and long-term progress.</p>
      </motion.header>

      <motion.div
        className="GoalsGrid"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: .35, delay: .1 }}
      >
        <div className="GoalsNutrition">
          <NutritionGoals />
        </div>

        <div className="GoalsWater">
          <WaterCard />
        </div>

        <div className="GoalsWeight">
          <GoalWeight />
        </div>

        <div className="GoalsStreak">
          <Streak />
        </div>

        <div className="GoalsExercise">
          <Exercise />
        </div>
      </motion.div>
    </main>
  );
}