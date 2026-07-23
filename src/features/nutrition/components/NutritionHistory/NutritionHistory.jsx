import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ChartLine } from "lucide-react";

import { getNutritionTotals } from "@/shared/utils/nutritionAnalytics";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Card from "@/shared/ui/Card/Card";

import "./NutritionHistory.css";


export default function NutritionHistory() {

  const [metric, setMetric] = useState("calories");


  const dataPoints = useSelector(
    (state) => state.personal.data_points
  );


  const chartData = useMemo(() => {

    return dataPoints

      .filter(
        (day) =>
          day.intake_list &&
          day.intake_list.length > 0
      )

      .map((day) => ({

        date:
          new Date(day.date)
            .toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
              }
            ),

        ...getNutritionTotals(
          day.intake_list
        ),

      }));

  }, [dataPoints]);



  const metrics = [
    "calories",
    "protein",
    "carbs",
    "fat",
  ];



  return (

    <Card className="NutritionHistory">


      <div className="NutritionHistoryHeader">


        <div className="NutritionHistoryIcon">

          <ChartLine />

        </div>


        <div>

          <h2>
            Nutrition History
          </h2>


          <p>
            Daily nutrition trends
          </p>

        </div>


      </div>





      <div className="MetricTabs">


        {metrics.map((item) => (

          <button

            key={item}

            className={
              metric === item
                ? "Active"
                : ""
            }

            onClick={() =>
              setMetric(item)
            }

          >

            {
              item.charAt(0).toUpperCase()
              +
              item.slice(1)
            }


          </button>

        ))}


      </div>





      <div className="NutritionChart">


        {chartData.length < 2 ? (

<div className="ChartEmpty">

  Not enough data yet.
  <br/>
  Log more meals to see trends.

</div>


        ) : (

          <ResponsiveContainer
            width="100%"
            height={260}
          >


           <LineChart
  data={chartData}
  margin={{
    top:20,
    right:20,
    left:10,
    bottom:10,
  }}
>

              <CartesianGrid

                stroke="#ffffff15"

                strokeDasharray="3 3"

              />



              <XAxis

                dataKey="date"

                stroke="#aaa"

              />



              <YAxis

                stroke="#aaa"

              />



              <Tooltip

                contentStyle={{

                  background:
                    "var(--color-card)",

                  border:
                    "1px solid var(--color-border)",

                  borderRadius:
                    "12px",

                }}

              />



              <Line

                type="monotone"

                dataKey={metric}

                stroke="var(--color-success)"

                strokeWidth={3}

                dot={false}

                activeDot={{
                  r:6,
                }}

              />


            </LineChart>


          </ResponsiveContainer>

        )}


      </div>


    </Card>

  );

}