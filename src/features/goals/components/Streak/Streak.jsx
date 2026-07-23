import { useSelector } from "react-redux";
import { Flame } from "lucide-react";

import Card from "@/shared/ui/Card/Card";

import { getStreakData } from "@/shared/utils/nutritionAnalytics";

import "./Streak.css";


export default function Streak() {

  const personal = useSelector(
    (state) => state.personal
  );


  const streak = getStreakData(
    personal.data_points,
    {
      calories: personal.daily_goal,
      protein: personal.protein_goal,
    }
  );


  return (

    <Card className="Streak">


      <div className="StreakHeader">


        <div className="StreakIcon">

          <Flame />

        </div>


        <div>

          <h2>
            Streak
          </h2>

          <p>
            Keep your momentum going
          </p>

        </div>


      </div>




      <div className="CurrentStreak">


        <strong>
          {streak.currentStreak}
        </strong>


        <span>
          days
        </span>


      </div>




      <div className="LongestStreak">

        <span>
          Longest streak
        </span>


        <strong>
          {streak.longestStreak} days
        </strong>


      </div>


    </Card>

  );

}