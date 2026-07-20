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
  let longestStreak = 0;

  const completedDays = dataPoints
    .filter(
      (day) =>
        day.intake_list &&
        day.intake_list.length > 0
    )
    .filter((day) => {
      const totals = getNutritionTotals(
        day.intake_list
      );

      return (
        totals.calories <= goals.calories &&
        totals.protein >= goals.protein
      );
    })
    .map((day) => {
      const date = new Date(day.date);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    })
    .sort((a, b) => a - b);


  let tempStreak = 0;
  let currentStreak = 0;


  for (let i = 0; i < completedDays.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const difference =
        (completedDays[i] - completedDays[i - 1]) /
        (1000 * 60 * 60 * 24);

      if (difference === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(
      longestStreak,
      tempStreak
    );
  }


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let checkDate = today.getTime();

  for (let i = completedDays.length - 1; i >= 0; i--) {
    if (completedDays[i] === checkDate) {
      currentStreak++;
      checkDate -= 1000 * 60 * 60 * 24;
    } else if (completedDays[i] < checkDate) {
      break;
    }
  }


  return {
    currentStreak,
    longestStreak,
  };
};