import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import DatePicker from "@/features/dashboard/components/DatePicker/DatePicker";
import SummaryCard from "@/features/dashboard/components/SummaryCard/SummaryCard";
import RecentMeals from "@/features/dashboard/components/RecentMeals/RecentMeals";
import ProgressCard from "@/features/dashboard/components/ProgressCard/ProgressCard";
import QuickActions from "@/features/dashboard/components/QuickActions/QuickActions";


import {
  selectFirstName,
  selectWeight,
  selectDailyGoal,
  selectDataPoints,
  selectProteinGoal,
  selectCarbsGoal,
  selectFatGoal,
  selectWaterGoal,
} from "@/features/profile/store/selectors";

import {
  Flame,
  Droplets,
  Scale,
} from "lucide-react";

import { getDateFormatted } from "@/shared/utils/utils";

import "./Today.css";


export default function Today() {
  const firstName = useSelector(selectFirstName);
  const weight = useSelector(selectWeight);
  const dailyGoal = useSelector(selectDailyGoal);
  const dataPoints = useSelector(selectDataPoints);
  const proteinGoal = useSelector(selectProteinGoal);
  const carbsGoal = useSelector(selectCarbsGoal);
  const fatGoal = useSelector(selectFatGoal);
  const waterGoal = useSelector(selectWaterGoal);


  const today = getDateFormatted(new Date());


  const todayData =
    dataPoints.find(
      (day) => day.date === today
    ) ?? {};


  const water = todayData.water ?? 0;


  const calories =
    todayData.intake_list?.reduce(
      (total, item) =>
        total + Number(item.serving?.calories ?? 0),
      0
    ) ?? 0;

  const protein =
  todayData.intake_list?.reduce(
    (total, item) =>
      total + Number(item.serving?.protein ?? 0),
    0
  ) ?? 0;


const carbs =
  todayData.intake_list?.reduce(
    (total, item) =>
      total + Number(item.serving?.carbs ?? 0),
    0
  ) ?? 0;


const fat =
  todayData.intake_list?.reduce(
    (total, item) =>
      total + Number(item.serving?.fat ?? 0),
    0
  ) ?? 0;


 return (
  <div className="Today">

    <motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  >
      <h1>
        Good Morning {firstName ? firstName : "there"} 👋
      </h1>

      <div className="TodayHeaderBottom">

  <p>
    Here's your progress for today.
  </p>

  <DatePicker />

</div>

    </motion.section>


    <motion.section
  className="SummaryGrid"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.1 }}
>
      <SummaryCard
        icon={<Flame />}
        title="Calories"
        value={calories ? `${calories} kcal` : "0 kcal"}
        subtitle={
  dailyGoal
    ? `of ${dailyGoal} kcal`
    : "Set your goal"
}
        accent="var(--color-primary)"
      />


      <SummaryCard
        icon={<Droplets />}
        title="Water"
        value={
  waterGoal
    ? `${water} / ${waterGoal}`
    : `${water}`
}
        subtitle="glasses"
        accent="var(--color-water)"
      />


      <SummaryCard
        icon={<Scale />}
        title="Weight"
        value={weight ? `${weight} kg` : "--"}
        subtitle="current"
        accent="var(--color-success)"
      />

    </motion.section>


    <motion.section
  className="ProgressSection"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.2 }}
>

<div className="SectionHeader">
  <h2>Today's Nutrition</h2>
  <p>Track your macro progress</p>
</div>

  <div className="ProgressGrid">

    <ProgressCard
      title="Protein"
      current={protein}
      goal={proteinGoal}
      unit="g"
      color="var(--color-success)"
    />

    <ProgressCard
      title="Carbs"
      current={carbs}
      goal={carbsGoal}
      unit="g"
      color="var(--color-warning)"
    />

    <ProgressCard
      title="Fat"
      current={fat}
      goal={fatGoal}
      unit="g"
      color="var(--color-primary)"
    />

  </div>

</motion.section>

    <QuickActions />

    <RecentMeals />
    
  </div>
);
}