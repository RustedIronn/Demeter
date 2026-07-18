import Card from "@/shared/ui/Card/Card";

import { useSelector } from "react-redux";

import { selectIntakeList } from "@/features/profile/store/selectors";

import { useNavigate } from "react-router-dom";

import "./RecentMeals.css";

export default function RecentMeals() {
  const intakeList = useSelector(selectIntakeList);
  const navigate = useNavigate();

  return (
    <Card className="RecentMeals">
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

    </Card>
  );
}