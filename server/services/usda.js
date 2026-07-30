import axios from "axios";


const BASE_URL =
  "https://api.nal.usda.gov/fdc/v1";


const SEARCH_CACHE_TIME =
  1000 * 60 * 30;


const searchCache = new Map();



const PREPARED_WORDS = [

  "juice",
  "drink",
  "smoothie",
  "shake",
  "cake",
  "pie",
  "cookie",
  "bar",
  "cereal",
  "chips",
  "snack",
  "dessert",

  "fried",
  "baked",
  "boiled",
  "steamed",
  "roasted",
  "grilled",

  "canned",
  "dried",
  "dehydrated",
  "frozen",

  "sweetened",
  "salted",
  "flavored",
  "seasoned",

  "with sauce",
  "ready-to-eat",

];



function normalizeQuery(query) {

  return String(query)
    .toLowerCase()
    .trim();

}



function cleanName(name = "") {

  return name

    .toLowerCase()

    // remove technical USDA words
    .replace(
      /\b(raw|cooked|fresh|ripe|slightly ripe|whole|uncooked|edible portion)\b/gi,
      ""
    )

    .replace(
      /\b(sulfured|sulphured)\b/gi,
      ""
    )

    // remove percentages
    .replace(
      /\b\d+%\b/g,
      ""
    )

    // move dried/baked style descriptors
    .replace(
      /^(.+?)\s+(dried)$/i,
      "Dried $1"
    )

    .replace(
      /,\s*/g,
      " "
    )

    .replace(
      /\s+/g,
      " "
    )

    .trim()

    .replace(/\b\w/g, c => c.toUpperCase());

}



function getNutrient(food, name, id) {

  const nutrient =
    food.foodNutrients?.find(
      (item) => {

        const nutrientId =
          item.nutrientId ??
          item.nutrient?.id;


        const nutrientName =
          item.nutrientName ??
          item.nutrient?.name;


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

const isWholeFood =

  !food.brandOwner &&

  (
    name === query ||

    name.startsWith(`${query},`) ||

    name.includes(", raw") ||

    name.includes(", ripe") ||

    name.includes(", fresh")
  );

  if (isWholeFood) {

    return "whole";

  }

  if (
    PREPARED_WORDS.some(
      word => name.includes(word)
    )
  ) {

    return "prepared";

  }

  if (food.brandOwner) {

    return "brand";

  }

  return "generic";

}

function scoreFood(food, query) {

  const name =
    cleanName(food.description)
      .toLowerCase();

  const type =
    classifyFood(food, query);

  let score = 0;

  switch(type) {

    case "whole":
      score += 500;
      break;

    case "generic":
      score += 300;
      break;

    case "prepared":
      score += 100;
      break;

    case "brand":
      score += 0;
      break;

    default:
      return -9999;

  }

  if (name === query)
    score += 200;

  if (name.startsWith(query))
    score += 120;

  if (name.includes(query))
    score += 60;

  if (name.includes("fresh"))
    score += 30;

  if (name.includes("whole"))
    score += 20;

  if (name.includes("ripe"))
    score += 20;

  score -= name.length * 0.15;

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



  if(cached) {


    const expired =
      Date.now() - cached.time >
      SEARCH_CACHE_TIME;



    if(!expired) {

      return cached.data;

    }



    searchCache.delete(
      normalizedQuery
    );

  }



  if(

    process.env.NODE_ENV !== "production"

  ) {

    console.log(
      `🌐 USDA search: ${normalizedQuery}`
    );

  }



  try {


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
    50,

},
        }

      );



    let foods =
  response.data.foods ?? [];

const whole = [];
const generic = [];
const prepared = [];
const branded = [];

for (const food of foods) {

  const type =
    classifyFood(
      food,
      normalizedQuery
    );

  if (type === "whole") {

  whole.push(food);
  continue;

}

  if (type === "generic") {

    generic.push(food);
    continue;

  }

  if (type === "prepared") {

    prepared.push(food);
    continue;

  }

  branded.push(food);

}

const sorter = (a, b) =>
  scoreFood(b, normalizedQuery)
  -
  scoreFood(a, normalizedQuery);

whole.sort(sorter);
generic.sort(sorter);
prepared.sort(sorter);
branded.sort(sorter);

foods = [

  ...whole,
  ...generic,
  ...prepared,
  ...branded,

];

const seen = new Set();

foods = foods.filter(food => {

  const key =
    cleanName(food.description)
      .toLowerCase();

  if (seen.has(key)) {
    return false;
  }

  seen.add(key);
  return true;

});

const results = foods.map((food) => {

  const type =
    classifyFood(
      food,
      normalizedQuery
    );

  const calories = getNutrient(
    food,
    "Energy",
    1008
  );

  const protein = getNutrient(
    food,
    "Protein",
    1003
  );

  const carbs = getNutrient(
    food,
    "Carbohydrate, by difference",
    1005
  );

  const fat = getNutrient(
    food,
    "Total lipid (fat)",
    1004
  );

  return {

    id: food.fdcId,

    name: cleanName(
      food.description
    ),

    brand:
      food.brandOwner ?? null,

    description:
      type === "brand"
        ? food.brandOwner
        : null,

    type:
      type === "whole"
        ? "Whole"
        : type === "generic"
          ? "Generic"
          : type === "prepared"
            ? "Prepared"
            : "Brand",

    calories:
      Math.round(calories),

    protein:
      Number(protein.toFixed(1)),

    carbs:
      Number(carbs.toFixed(1)),

    fat:
      Number(fat.toFixed(1)),

  };

});



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

  catch(error) {


    console.error(
      "USDA search failed:",
      error.message
    );


    throw error;

  }

}



export async function getFood(id) {


  if(

    process.env.NODE_ENV !== "production"

  ) {

    console.log(
      `🌐 USDA detail fetch: ${id}`
    );

  }



  try {


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

  catch(error) {


    console.error(
      "USDA detail failed:",
      error.message
    );


    throw error;

  }

}