import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Droplets, Plus, Scale } from "lucide-react";

import Button from "@/shared/ui/Button/Button";
import { increaseWater } from "@/features/profile/store/thunks";

import "./QuickActions.css";

const containerAnimation = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: 0.25,
    },
  },
};

export default function QuickActions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <motion.section
      className="QuickActions"
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
    >
      <div className="QuickActionsHeader">
        <h2>Quick Actions</h2>
        <p>Log your daily progress</p>
      </div>

      <div className="ActionGrid">
        <Button
          variant="secondary"
          className="ActionButton ActionButtonFood"
          onClick={() => navigate("/diary")}
        >
          <Plus size={20} />
          Add Food
        </Button>

        <Button
          variant="secondary"
          className="ActionButton ActionButtonWater"
          onClick={() => dispatch(increaseWater())}
        >
          <Droplets size={20} />
          Add Water
        </Button>

        <Button
          variant="secondary"
          className="ActionButton ActionButtonWeight"
          onClick={() => navigate("/goals")}
        >
          <Scale size={20} />
          Update Weight
        </Button>
      </div>
    </motion.section>
  );
}