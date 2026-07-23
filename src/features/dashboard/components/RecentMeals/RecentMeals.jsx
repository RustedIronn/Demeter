import Card from "@/shared/ui/Card/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectIntakeList,
} from "@/features/profile/store/selectors";

import {
  Utensils,
} from "lucide-react";

import "./RecentMeals.css";


export default function RecentMeals() {

  const intakeList = useSelector(selectIntakeList);

  const navigate = useNavigate();


  return (

    <Card className="RecentMeals">

      <div className="RecentMealsHeader">

        <h2>
          Recent Meals
        </h2>


        <button
          onClick={() => navigate("/diary")}
        >
          View Diary →
        </button>

      </div>


      {intakeList.length === 0 ? (

        <div className="EmptyMeals">

          <Utensils />

          <h3>
            No meals tracked yet
          </h3>

          <p>
            Add your first meal to start tracking your nutrition.
          </p>

          <button
            onClick={() => navigate("/diary")}
          >
            Add Food
          </button>

        </div>

      ) : (

        intakeList
          .slice(0, 4)
          .map((item,index)=>(

          <div
            className="MealItem"
            key={index}
          >

            <div className="MealInfo">

              <h4>
                {item.name}
              </h4>

              <p>
                {item.meal_type}
              </p>

            </div>


            <span>
              {item.serving?.calories ?? 0} kcal
            </span>


          </div>

        ))

      )}

    </Card>

  );
}