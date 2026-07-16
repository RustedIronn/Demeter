import { useSelector } from "react-redux";

import {
  Flame,
  Apple,
  Wheat,
  Beef,
} from "lucide-react";

import "./GoalSummary.css";


export default function GoalSummary() {

  const personal = useSelector(
    (state) => state.personal
  );


  const {
    caloriesConsumed,
    proteinConsumed,
    carbsConsumed,
    fatConsumed,
  } = useSelector(
    (state) => state.calculatedInformation
  );


  const percentage =
    personal.daily_goal
      ? Math.min(
          Math.round(
            (caloriesConsumed /
            personal.daily_goal) * 100
          ),
          100
        )
      : 0;


  return (
    <section className="GoalSummary">


      <h2>
        Today's Goals
      </h2>


      <div className="GoalProgress">

        <Flame />

        <div>

          <strong>
            {caloriesConsumed}
            /
            {personal.daily_goal}
            kcal
          </strong>


          <div className="ProgressTrack">

            <div
              className="ProgressFill"
              style={{
                width: `${percentage}%`
              }}
            />

          </div>

        </div>

      </div>



      <div className="MacroGrid">


       <div>
  <Apple/>
  <span>Protein</span>
  <strong>{proteinConsumed}g</strong>
</div>


<div>
  <Wheat/>
  <span>Carbs</span>
  <strong>{carbsConsumed}g</strong>
</div>


<div>
  <Beef/>
  <span>Fat</span>
  <strong>{fatConsumed}g</strong>
</div>


      </div>


    </section>
  );
}