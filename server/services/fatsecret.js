import axios from "axios";

const BASE_URL = "https://platform.fatsecret.com/rest/server.api";
const TOKEN_URL = "https://oauth.fatsecret.com/connect/token";

const searchCache = new Map();

let accessToken = null;
let tokenExpiresAt = 0;
let tokenPromise = null;

function normalizeSearchQuery(query) {
  return query.toLowerCase().trim();
}

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  if (tokenPromise) {
    return tokenPromise;
  }

  console.log("🔑 Requesting new FatSecret OAuth2 token...");

  tokenPromise = axios
    .post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "basic",
      }),
      {
        auth: {
          username: process.env.FATSECRET_CLIENT_ID,
          password: process.env.FATSECRET_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      accessToken = response.data.access_token;

      tokenExpiresAt =
        Date.now() + (response.data.expires_in - 60) * 1000;

      console.log("✅ FatSecret OAuth2 token acquired.");

      return accessToken;
    })
    .finally(() => {
      tokenPromise = null;
    });

  return tokenPromise;
}

async function fatSecretRequest(params) {
  const token = await getAccessToken();

const ip = await axios.get("https://api.ipify.org?format=json");
console.log("Outgoing IP:", ip.data.ip);

  const response = await axios.get(BASE_URL, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data.error) {
    throw new Error(response.data.error.message);
  }

  return response.data;
}

export async function searchFood(query) {
  const normalizedQuery = normalizeSearchQuery(query);

  if (searchCache.has(normalizedQuery)) {
    console.log(`📦 Search cache hit: ${normalizedQuery}`);
    return await searchCache.get(normalizedQuery);
  }

  console.log(`🌐 FatSecret search: ${normalizedQuery}`);

  const promise = fatSecretRequest({
    method: "foods.search",
    search_expression: normalizedQuery,
    format: "json",
    max_results: 20,
  }).catch((err) => {
    searchCache.delete(normalizedQuery);
    throw err;
  });

  searchCache.set(normalizedQuery, promise);

  return await promise;
}

export async function getFood(foodId) {
  return await fatSecretRequest({
    method: "food.get",
    food_id: foodId,
    format: "json",
  });
}