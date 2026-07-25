import { Scale } from "lucide-react";
import Card from "@/shared/ui/Card/Card";
import { useSelector } from "react-redux";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./WeightHistory.css";


export default function WeightHistory() {

  const history = useSelector(
    (state) => state.profile.weight_history
  );


  const formatDate = (dateString) => {

    const date = new Date(dateString);

    const today = new Date();

    const yesterday = new Date();

    yesterday.setDate(
      today.getDate() - 1
    );


    if (
      date.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }


    if (
      date.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }


    return date.toLocaleDateString(
      "en-GB",
      {
        day:"numeric",
        month:"short",
      }
    );

  };



  const chartData =
    history
      ?.slice()
      .sort(
        (a,b) =>
          new Date(a.date) -
          new Date(b.date)
      )
      .map((entry)=>({

        weight:entry.weight,

        label:
          formatDate(entry.date),

      })) ?? [];



  return (

    <Card className="WeightHistory">


      <div className="WeightHistoryHeader">


        <div className="WeightHistoryIcon">

          <Scale />

        </div>


        <div>

          <h2>
            Weight History
          </h2>


          <p>
            Your progress over time
          </p>

        </div>


      </div>



      {
        chartData.length < 2 ? (

          <div className="WeightHistoryEmpty">

            {
              chartData.length === 0
                ? "No weight history available."
                : "Add more entries to see progress."
            }

          </div>


        ) : (


          <ResponsiveContainer
            width="100%"
            height={250}
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

                dataKey="label"

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

                  color:
                    "var(--color-text)",

                }}

              />



              <Line

                type="monotone"

                dataKey="weight"

                stroke="var(--color-success)"

                strokeWidth={3}

                dot={false}

                activeDot={{
                  r:6,
                }}

              />


            </LineChart>


          </ResponsiveContainer>


        )
      }


    </Card>

  );

}