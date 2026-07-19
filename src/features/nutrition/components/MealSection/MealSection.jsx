import Card from "@/shared/ui/Card/Card";
import ItemFood from "@/features/nutrition/components/ItemFood/ItemFood";

import {
  Plus,
} from "lucide-react";

import { useDispatch } from "react-redux";

import {
  mealTypeSelectedSet,
  searchModalSet,
} from "@/features/nutrition/store/slice";

import "./MealSection.css";


export default function MealSection({
  title,
  items,
  mealType,
}) {


  const dispatch = useDispatch();



  const totals = items.reduce(
    (acc, item) => {

      const amount =
        item.serving_size;


      acc.calories +=
        item.serving.calories * amount;


      acc.protein +=
        item.serving.protein * amount;


      acc.carbs +=
        item.serving.carbs * amount;


      acc.fat +=
        item.serving.fat * amount;


      return acc;

    },
    {
      calories:0,
      protein:0,
      carbs:0,
      fat:0,
    }
  );



  const mealIndexes = {
    breakfast:0,
    lunch:1,
    dinner:2,
    snack:3,
  };



  const handleAdd = () => {

    dispatch(
      mealTypeSelectedSet(
        mealIndexes[mealType]
      )
    );


    dispatch(
      searchModalSet({
        searchVisible:false,
        searchText:"",
      })
    );


    requestAnimationFrame(() => {

      document
        .getElementById(
          "food-search-input"
        )
        ?.focus();

    });

  };



  return (

    <Card className="MealSection">


      <div className="MealSectionHeader">


        <div>

          <h3>
            {title}
          </h3>


          {items.length > 0 && (

            <div className="MealTotals">

              <strong>
                {Math.round(
                  totals.calories
                )} kcal
              </strong>


              <small>
                P {Math.round(totals.protein)}g
                {" • "}
                C {Math.round(totals.carbs)}g
                {" • "}
                F {Math.round(totals.fat)}g
              </small>

            </div>

          )}

        </div>


      </div>



      {items.length === 0 ? (

        <div className="MealEmpty">

          <span>
            🍽️
          </span>


          <p>
            No {mealType} logged yet.
          </p>


          <button
            className="MealAddLarge"
            onClick={handleAdd}
          >

            <Plus size={18}/>

            Add {title}

          </button>


        </div>


      ) : (

        items.map((item,index)=>(

          <ItemFood
            key={`${mealType}-${index}`}
            item={item}
            index={item.originalIndex}
          />

        ))

      )}


    </Card>

  );
}