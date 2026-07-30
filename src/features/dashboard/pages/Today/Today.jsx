import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Droplets, Flame, Scale } from "lucide-react";

import DatePicker from "@/shared/components/DatePicker/DatePicker";
import SectionTitle from "@/shared/ui/SectionTitle/SectionTitle";

import SummaryCard from "@/features/dashboard/components/SummaryCard/SummaryCard";
import ProgressCard from "@/features/dashboard/components/ProgressCard/ProgressCard";
import QuickActions from "@/features/dashboard/components/QuickActions/QuickActions";
import RecentMeals from "@/features/nutrition/components/RecentMeals/RecentMeals";

import { selectSelectedDate } from "@/app/state/selectors";

import {
  selectCarbsGoal,
  selectDailyGoal,
  selectDataPoints,
  selectFatGoal,
  selectFirstName,
  selectProteinGoal,
  selectWaterGoal,
  selectWeight,
} from "@/features/profile/store/selectors";

import { getDateFormatted } from "@/shared/utils/utils";

import "./Today.css";

const sectionAnimation = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function getNutrientTotal(items, nutrient) {
  return items.reduce((total, item) => {
    const amount = Number(item.serving_size) || 1;
    const value = Number(item.serving?.[nutrient]) || 0;

    return total + value * amount;
  }, 0);
}

export default function Today() {
  const firstName = useSelector(selectFirstName);
  const weight = useSelector(selectWeight);
  const dailyGoal = useSelector(selectDailyGoal);
  const dataPoints = useSelector(selectDataPoints) ?? [];
  const proteinGoal = useSelector(selectProteinGoal);
  const carbsGoal = useSelector(selectCarbsGoal);
  const fatGoal = useSelector(selectFatGoal);
  const waterGoal = useSelector(selectWaterGoal);
  const selectedDate = useSelector(selectSelectedDate);

  const selected = getDateFormatted(selectedDate);

  const selectedData =
    dataPoints.find((day) => day.date === selected) ?? {};

  const intakeList = selectedData.intake_list ?? [];
  const water = Number(selectedData.water) || 0;

  const calories = getNutrientTotal(intakeList, "calories");
  const protein = getNutrientTotal(intakeList, "protein");
  const carbs = getNutrientTotal(intakeList, "carbs");
  const fat = getNutrientTotal(intakeList, "fat");

  return (
    <main className="Today">
      <motion.header
        className="TodayHeader"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.35 }}
      >
        <div className="TodayHeaderContent">
          <h1>Good morning, {firstName || "there"} 👋</h1>
          <p>Here&apos;s your progress for today.</p>
        </div>

        <DatePicker />
      </motion.header>

      <motion.section
        className="SummaryGrid"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <SummaryCard
          icon={<Flame />}
          title="Calories"
          value={`${Math.round(calories)} kcal`}
          subtitle={
            dailyGoal
              ? `of ${dailyGoal} kcal`
              : "Set your calorie goal"
          }
          accent="var(--color-primary)"
        />

        <SummaryCard
          icon={<Droplets />}
          title="Water"
          value={
            waterGoal
              ? `${water} / ${waterGoal}`
              : String(water)
          }
          subtitle="glasses"
          accent="var(--color-water)"
        />

        <SummaryCard
          icon={<Scale />}
          title="Weight"
          value={weight ? `${weight} kg` : "--"}
          subtitle="current weight"
          accent="var(--color-success)"
        />
      </motion.section>

      <motion.section
        className="ProgressSection"
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        <SectionTitle
          title="Macro Progress"
          subtitle="Track your daily nutrition goals"
        />

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
    </main>
  );
}