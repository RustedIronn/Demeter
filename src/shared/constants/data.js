import { getDateFormatted } from "@/shared/utils/utils";

const today = new Date();
const yesterday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 1
);
const beforeYesterday = new Date(
  yesterday.getFullYear(),
  yesterday.getMonth(),
  yesterday.getDate() - 1
);

export const data = {
  first_name: "Jane",
  last_name: "Appleseed",

  height_cm: 163,
  weight_kg: 57,

  daily_goal: 1500,

  protein_goal: 120,
  carbs_goal: 180,
  fat_goal: 50,

  goal_weight: 55,
  goal_date: null,

  waterGoal: 8,

  weight_history: [],

  data_points: [
    {
      date: getDateFormatted(today),
      intake_list: [],
      water: 0,
    },
    {
      date: getDateFormatted(yesterday),
      intake_list: [],
      water: 0,
    },
    {
      date: getDateFormatted(beforeYesterday),
      intake_list: [],
      water: 0,
    },
  ],
};