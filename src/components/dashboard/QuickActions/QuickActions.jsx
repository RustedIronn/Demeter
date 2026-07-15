import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Droplets,
  Scale,
} from "lucide-react";

import { increaseWater } from "@/store/personal/thunks";

import "./QuickActions.css";


export default function QuickActions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <motion.section
  className="QuickActions"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.4 }}
>
      <h2>Quick Actions</h2>


      <div className="ActionGrid">

        <button
          onClick={() => navigate("/diary")}
        >
          <Plus />
          Add Food
        </button>


        <button
          onClick={() => dispatch(increaseWater())}
        >
          <Droplets />
          Add Water
        </button>


        <button>
          <Scale />
          Update Weight
        </button>

      </div>

    </motion.section>
  );
}