import axios from "axios";

const BASE_URL = "https://api.pexels.com/v1/search";

const imageCache = new Map();

function normalizeFoodQuery(query) {
  return query
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/\b(organic|baby|mini|large|small|medium|fresh)\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\bbananas\b/g, "banana");
}

export async function getFoodImage(query) {
  const normalizedQuery = normalizeFoodQuery(query);

  if (imageCache.has(normalizedQuery)) {
    console.log(`📦 Cache hit: ${normalizedQuery}`);
    return await imageCache.get(normalizedQuery);
  }

  console.log(`🌐 Fetching image: ${normalizedQuery}`);

  const imagePromise = axios
    .get(BASE_URL, {
      params: {
        query: normalizedQuery,
        per_page: 1,
      },
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    })
    .then(({ data }) => data.photos?.[0]?.src?.large ?? null)
    .catch((err) => {
      imageCache.delete(normalizedQuery);
      throw err;
    });

  imageCache.set(normalizedQuery, imagePromise);

  return await imagePromise;
}