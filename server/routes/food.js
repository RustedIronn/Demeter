import express from "express";

import {
  searchFood,
  getFood,
} from "../services/usda.js";

import {
  getFoodImage,
} from "../services/pexels.js";


const router = express.Router();



router.get("/search", async (req, res) => {

  try {

    const { q } = req.query;


    if (!q) {

      return res.status(400).json({
        error: "Missing search query.",
      });

    }



    const foods =
      await searchFood(q);



    const formattedFoods =
      await Promise.all(

        foods.map(async (food) => ({

          id:
            food.id,


          name:
            food.name,


          brand:
            food.brand ?? null,


          description:
            food.description,


          type:
            food.type,


image:
  await getFoodImage(food.name)
    .catch(() => null),

        }))

      );



    res.json(formattedFoods);



  } catch (error) {


    console.error(error);


    res.status(500).json({

      error:
        "Failed to search foods.",


      message:
        error.message,

    });


  }

});








router.get("/food/:id", async (req, res) => {

  try {

    const { id } =
      req.params;



    const food =
      await getFood(id);



    const formattedFood = {

      id:
        food.id,


      name:
        food.name,


      brand:
        food.brand ?? null,


      type:
        food.type ?? null,


image:
  await getFoodImage(food.name)
    .catch(() => null),


      servings:
        food.servings,

    };



    res.json(formattedFood);



  } catch (error) {


    console.error(error);



    res.status(500).json({

      error:
        "Failed to get food.",


      message:
        error.message,

    });


  }

});



export default router;