import { useSelector } from "react-redux";

import ItemFood from "@/features/nutrition/components/ItemFood/ItemFood";

import "./ListFood.css";


export default function ListFood() {
  const intakeList = useSelector(
    (state) => state.personal.intakeList
  );


  return (
    <section className="ListFood">

      <div className="ListFoodHeader">
        <h2>
          Today's Meals
        </h2>

        <span>
          {intakeList.length} items
        </span>
      </div>


      {intakeList.length === 0 ? (

        <div className="ListFoodEmpty">
          <p>
            No meals added yet.
          </p>

          <span>
            Start tracking your nutrition by adding food.
          </span>
        </div>

      ) : (

        <div className="FoodItems">

          {intakeList.map((item, index) => (

            <div
              className="FoodItemWrapper"
              key={index}
            >
              <ItemFood
                item={item}
                index={index}
              />
            </div>

          ))}

        </div>

      )}

    </section>
  );
}