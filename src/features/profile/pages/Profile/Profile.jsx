import { motion } from "framer-motion";

import BasicInformation from "@/features/profile/components/BasicInformation/BasicInformation";
import GoalSummary from "@/features/goals/components/GoalSummary/GoalSummary";

import "./Profile.css";

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

export default function Profile() {
  return (
    <main className="Profile">
      <motion.header
        className="ProfileHeader"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: .35 }}
      >
        <h1>Profile</h1>
        <p>Manage your personal information and nutrition goals.</p>
      </motion.header>

      <motion.div
        className="ProfileGrid"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: .35, delay: .1 }}
      >
        <div className="ProfileInfo">
          <BasicInformation />
        </div>

        <div className="ProfileGoals">
          <GoalSummary />
        </div>
      </motion.div>
    </main>
  );
}