import { motion } from "framer-motion";

import { useSelector } from "react-redux";

import { selectIntakeList } from "@/features/profile/store/selectors";

import { useNavigate } from "react-router-dom";

import "./RecentMeals.css";

export default function RecentMeals() {
  const intakeList = useSelector(selectIntakeList);
  const navigate = useNavigate();

  return (
    <motion.section
  className="RecentMeals"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.3 }}
>
      <div className="RecentMealsHeader">

  <h2>Recent Meals</h2>

  <button
    onClick={() => navigate("/diary")}
  >
    View Diary →
  </button>

</div>


      {intakeList.length === 0 ? (
        <p className="EmptyMeals">
          No meals added yet.
        </p>
      ) : (
        intakeList.map((item, index) => (
          <div
            className="MealItem"
            key={index}
          >
            <div>
              <h4>{item.name}</h4>

              <p>
                {item.meal_type}
              </p>
            </div>

            <span>
              {item.serving.calories} kcal
            </span>

          </div>
        ))
      )}

    </motion.section>
  );
}