export const getNutritionTotals = (intakeList = []) => {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  intakeList.forEach((item) => {
    if (!item.serving) return;

    const multiplier = item.serving_size;

    calories += item.serving.calories * multiplier;
    protein += item.serving.protein * multiplier;
    carbs += item.serving.carbs * multiplier;
    fat += item.serving.fat * multiplier;
  });

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
  };
};

export const getNutritionAverage = (
  dataPoints = []
) => {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  let loggedDays = 0;

  dataPoints.forEach((day) => {
    if (day.intake_list.length === 0) return;

    loggedDays++;

    const totals = getNutritionTotals(
      day.intake_list
    );

    calories += totals.calories;
    protein += totals.protein;
    carbs += totals.carbs;
    fat += totals.fat;
  });

  if (loggedDays === 0) {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      loggedDays: 0,
    };
  }

  return {
    calories: Math.round(
      calories / loggedDays
    ),
    protein: Math.round(
      protein / loggedDays
    ),
    carbs: Math.round(
      carbs / loggedDays
    ),
    fat: Math.round(
      fat / loggedDays
    ),
    loggedDays,
  };
};

export const getGoalAchievement = (
  dataPoints = [],
  goals = {}
) => {
  let caloriesHit = 0;
  let proteinHit = 0;
  let carbsHit = 0;
  let fatHit = 0;

  let totalDays = 0;

  dataPoints.forEach((day) => {
    if (!day.intake_list || day.intake_list.length === 0) {
      return;
    }

    totalDays++;

    const totals = getNutritionTotals(
      day.intake_list
    );

    if (
      totals.calories <= goals.calories
    ) {
      caloriesHit++;
    }

    if (
      totals.protein >= goals.protein
    ) {
      proteinHit++;
    }

    if (
      totals.carbs <= goals.carbs
    ) {
      carbsHit++;
    }

    if (
      totals.fat <= goals.fat
    ) {
      fatHit++;
    }
  });

  return {
    totalDays,

    caloriesHit,
    proteinHit,
    carbsHit,
    fatHit,
  };
};

export const getStreakData = (
  dataPoints = [],
  goals = {}
) => {
  let currentStreak = 0;
  let longestStreak = 0;

  let tempStreak = 0;

  const sortedDays = [...dataPoints].sort(
    (a, b) =>
      new Date(a.date) - new Date(b.date)
  );


  sortedDays.forEach((day) => {
    if (
      !day.intake_list ||
      day.intake_list.length === 0
    ) {
      tempStreak = 0;
      return;
    }

    const totals = getNutritionTotals(
      day.intake_list
    );

    const caloriesGood =
      goals.calories &&
      totals.calories <= goals.calories;

    const proteinGood =
      goals.protein &&
      totals.protein >= goals.protein;


    const dayCompleted =
      caloriesGood &&
      proteinGood;


    if (dayCompleted) {
      tempStreak++;

      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  });


  currentStreak = tempStreak;


  return {
    currentStreak,
    longestStreak,
  };
};