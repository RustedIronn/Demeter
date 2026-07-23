import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/Button/Button";

import {
  Plus,
  Droplets,
  Scale,
} from "lucide-react";

import { increaseWater } from "@/features/profile/store/thunks";

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

        <Button
  className="ActionButton"
  onClick={() => navigate("/diary")}
>
  <Plus />
  Add Food
</Button>


<Button
  className="ActionButton"
  onClick={() => dispatch(increaseWater())}
>
  <Droplets />
  Add Water
</Button>


<Button
  className="ActionButton"
>
  <Scale />
  Update Weight
</Button>

      </div>

    </motion.section>
  );
}