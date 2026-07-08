import express from "express";
import { searchFood, getFood } from "../services/fatsecret.js";
import { getFoodImage } from "../services/pexels.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        error: "Missing search query.",
      });
    }

    const data = await searchFood(q);

    const foods = data.foods?.food ?? [];

const normalizedQuery = q.toLowerCase().trim();

foods.sort((a, b) => {
  const aName = a.food_name.toLowerCase();
  const bName = b.food_name.toLowerCase();

  const aStarts = aName.startsWith(normalizedQuery);
  const bStarts = bName.startsWith(normalizedQuery);

  if (aStarts !== bStarts) {
    return bStarts - aStarts;
  }

  return aName.localeCompare(bName);
});

    const formattedFoods = await Promise.all(
      foods.map(async (food) => ({
        id: food.food_id,
        name: food.food_name,
        brand: food.brand_name ?? null,
        description: food.food_description,
        type: food.food_type,
        image: await getFoodImage(food.food_name),
      }))
    );

    res.json(formattedFoods);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to search foods.",
      message: error.message,
    });
  }
});

router.get("/food/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await getFood(id);

    const food = data.food;

    const servings = (food.servings?.serving ?? []).map((serving) => ({
      id: serving.serving_id,
      description: serving.serving_description,

      metricAmount: Number(serving.metric_serving_amount) || 0,
      metricUnit: serving.metric_serving_unit,

      calories: Number(serving.calories) || 0,
      protein: Number(serving.protein) || 0,
      carbs: Number(serving.carbohydrate) || 0,
      fat: Number(serving.fat) || 0,

      servingAmount: Number(serving.number_of_units) || 1,
      servingUnit: serving.measurement_description,
    }));

    const formattedFood = {
      id: food.food_id,
      name: food.food_name,
      brand: food.brand_name ?? null,
      type: food.food_type,
      image: await getFoodImage(food.food_name),
      servings,
    };
console.dir(formattedFood, { depth: null });
    res.json(formattedFood);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get food.",
      message: error.message,
    });
  }
});

export default router;