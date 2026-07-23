import Card from "@/shared/ui/Card/Card";

import {
  Plus,
} from "lucide-react";

import { useDispatch } from "react-redux";

import {
  mealTypeSelectedSet,
  searchModalSet,
} from "@/features/nutrition/store/slice";

import ItemFood from "@/features/nutrition/components/ItemFood/ItemFood";

import "./MealSection.css";


export default function MealSection({
  title,
  items,
  mealType,
  icon: Icon,
}) {


  const dispatch = useDispatch();



  const totals = items.reduce(
    (acc, item) => {

      const amount =
        item.serving_size ?? 1;


      acc.calories +=
        (item.serving?.calories ?? 0) *
        amount;


      acc.protein +=
        (item.serving?.protein ?? 0) *
        amount;


      acc.carbs +=
        (item.serving?.carbs ?? 0) *
        amount;


      acc.fat +=
        (item.serving?.fat ?? 0) *
        amount;


      return acc;

    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );



  const mealIndexes = {
    breakfast: 0,
    lunch: 1,
    dinner: 2,
    snack: 3,
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


          <div className="MealTitle">

            {Icon && (
              <Icon size={20}/>
            )}


            <h3>
              {title}
            </h3>

          </div>



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


          <div className="MealEmptyIcon">

            <Icon size={24}/>

          </div>


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