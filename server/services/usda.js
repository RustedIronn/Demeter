import axios from "axios";

const BASE_URL =
  "https://api.nal.usda.gov/fdc/v1";

const searchCache = new Map();

const CACHE_TIME =
  1000 * 60 * 30; // 30 minutes

function normalizeQuery(query) {

  return query
    .toLowerCase()
    .trim();

}

function cleanName(name = "") {

  return name
    .replace(/, raw/gi, "")
    .replace(/, cooked/gi, "")
    .replace(/, with skin/gi, "")
    .replace(/, without skin/gi, "")
    .replace(/, ripe/gi, "")
    .replace(/, slightly ripe/gi, "")
    .trim();

}

function getNutrient(food, name, id) {

  const nutrient =
    food.foodNutrients?.find(
      (n) => {

        const nutrientId =
          n.nutrientId ??
          n.nutrient?.id;

        const nutrientName =
          n.nutrientName ??
          n.nutrient?.name;

        return (

          nutrientId === id ||

          nutrientName === name

        );

      }
    );

  return Number(

    nutrient?.value ??

    nutrient?.amount ??

    0

  );

}

function scaleNutrient(
  food,
  name,
  id,
  amount
) {

  return (

    getNutrient(
      food,
      name,
      id
    )

    *

    (amount / 100)

  );

}

function classifyFood(food, query) {

  const name =
    food.description
      ?.toLowerCase() ?? "";

  if (

    food.brandOwner &&

    name === query

  ) {

    return "reject";

  }

  const preparedWords = [

    "juice",
    "drink",
    "smoothie",
    "cake",
    "pie",
    "pudding",
    "cookie",
    "bar",
    "cereal",
    "yogurt",
    "chips",
    "snack",

  ];

  if (

    preparedWords.some(
      word =>
        name.includes(word)
    )

  ) {

    return "prepared";

  }

  if(food.brandOwner) {

    return "brand";

  }

  return "generic";

}

function scoreFood(food, query) {

  const name =
    food.description
      ?.toLowerCase() ?? "";

  const type =
    classifyFood(
      food,
      query
    );

  if(type === "reject") {

    return -999;

  }

  let score = 0;

  if(type === "generic") {

    score += 100;

  }

  if(type === "brand") {

    score += 20;

  }

  if(type === "prepared") {

    score -= 50;

  }

  if(name === query) {

    score += 60;

  }

  if(name.startsWith(query)) {

    score += 40;

  }

  if(name.includes("raw")) {

    score += 25;

  }

  if(name.includes("ripe")) {

    score += 20;

  }

  return score;

}

function formatFood(food) {

  const amount =
    Number(food.servingSize) || 100;

  const unit =
    food.servingSizeUnit || "g";

  return {

    id:
      food.fdcId,

    name:
      cleanName(
        food.description
      ),

    brand:
      food.brandOwner ?? null,

    type:
      food.brandOwner
        ? "Brand"
        : "Generic",

    image:
      null,

    servings: [

      {
        id:
          String(
            food.fdcId
          ),

        description:
          food.householdServingFullText ??

          `${amount}${unit}`,

        metricAmount:
          amount,

        metricUnit:
          unit,

        calories:
          scaleNutrient(
            food,
            "Energy",
            1008,
            amount
          ),

        protein:
          scaleNutrient(
            food,
            "Protein",
            1003,
            amount
          ),

        carbs:
          scaleNutrient(
            food,
            "Carbohydrate, by difference",
            1005,
            amount
          ),

        fat:
          scaleNutrient(
            food,
            "Total lipid (fat)",
            1004,
            amount
          ),

        servingAmount:
          1,

        servingUnit:
          unit,

      },

    ],

  };

}

export async function searchFood(query) {

  const normalizedQuery =
    normalizeQuery(query);

  const cached =
    searchCache.get(
      normalizedQuery
    );

  if(

    cached &&

    Date.now() - cached.time < CACHE_TIME

  ) {

    return cached.data;

  }

  console.log(
    `🌐 USDA search: ${normalizedQuery}`
  );

  const response =
    await axios.get(


      `${BASE_URL}/foods/search`,


      {

        params: {


          api_key:
            process.env.USDA_API_KEY,



          query:
            normalizedQuery,



          pageSize:
            20,


        },


      }


    );

  let foods =
    response.data.foods ?? [];

  foods =

    foods.filter(

      food =>

        classifyFood(
          food,
          normalizedQuery
        )

        !==

        "reject"

    );

  foods.sort(

    (a,b)=>

      scoreFood(
        b,
        normalizedQuery
      )

      -

      scoreFood(
        a,
        normalizedQuery
      )

  );

  const results =

    foods.map(

      food => {

        const type =
          classifyFood(
            food,
            normalizedQuery
          );

        return {

          id:
            food.fdcId,

          name:
            cleanName(
              food.description
            ),

          brand:
            food.brandOwner ?? null,

          description:
            type === "brand"

              ? food.brandOwner

              : null,

          type:
            type === "brand"

              ? "Brand"

              :

              type === "prepared"

                ? "Prepared"

                :

                "Generic",
        };


      }

    );

  searchCache.set(

    normalizedQuery,

    {
      data:
        results,

      time:
        Date.now(),
    }

  );

  return results;
}

export async function getFood(id) {

  console.log(
    `🌐 USDA detail fetch: ${id}`
  );

  const response =
    await axios.get(

      `${BASE_URL}/food/${id}`,
      {

        params: {


          api_key:
            process.env.USDA_API_KEY,

        },

      }

    );

  return formatFood(
    response.data
  );

}